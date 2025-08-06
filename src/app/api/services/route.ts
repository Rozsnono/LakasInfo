// app/api/users/route.ts
import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const client = await clientPromise;
    const db = client.db('lakasinfo');

    const year = new URL(req.url).searchParams.get('year') || '';
    const homeId = new URL(req.url).searchParams.get('homeId') || '';
    const type = new URL(req.url).searchParams.get('type') || 'electricity';

    const services = await db.collection('services').findOne({ homeId: new mongoose.Types.ObjectId(homeId) });
    if (!services) {
        return NextResponse.json({ error: 'Szolgáltatás nem található' }, { status: 404 });
    }

    const serviceData = services.services.map((service: any) => {
        const data = Object.entries(service.data).filter(([date]) => date.startsWith(year));
        const yearlyAverage = (Object.values(data).map((d) => d[1])).reduce((acc: number, val: any) => acc + (val.difference || 0), 0) / data.length || 0;
        return {
            name: service.name,
            measurement: service.measurement,
            data: Object.fromEntries(data),
            average: service.average,
            yearly_average: yearlyAverage,
            years: Object.keys(service.data).map(date => date.split('-')[0]).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => parseInt(a) - parseInt(b)),
        };
    });

    return NextResponse.json(serviceData.find((s: any) => s.name === type) || { error: 'Szolgáltatás nem található' });
}


export async function POST(req: Request) {
    try {
        const client = await clientPromise
        const db = client.db('lakasinfo')

        const body = await req.json()

        if (!body.date || !body.value || !body.serviceName || !body.homeId) {
            return NextResponse.json({ error: 'Dátum, érték, szolgáltatás és lakás szükséges' }, { status: 400 })
        }

        const service = await db.collection('services').findOne({ homeId: new mongoose.Types.ObjectId(body.homeId) });

        if (!service) {
            return NextResponse.json({ error: 'Szolgáltatás nem található' }, { status: 404 })
        }

        const date = new Date(body.date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const prevDate = new Date(date);
        prevDate.setMonth(prevDate.getMonth() - 1);
        const formattedPrevDate = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

        service.services.find((s: any) => s.name === body.serviceName).data[formattedDate] = { value: body.value, difference: body.value - (service.services.find((s: any) => s.name === body.serviceName).data[formattedPrevDate]?.value || body.value) };
        const sum = (Object.values(service.services.find((s: any) => s.name === body.serviceName).data) as any).map((d: any) => d.difference || 0);
        console.log('Összeg:', sum.reduce((acc: number, val: number) => acc + val, 0));
        service.services.find((s: any) => s.name === body.serviceName).average = sum.reduce((acc: number, val: number) => acc + val, 0) / sum.length;


        const resultServices = await db.collection('services').replaceOne({ homeId: new mongoose.Types.ObjectId(body.homeId) }, service);

        return NextResponse.json({ success: true, count: resultServices.modifiedCount })
    } catch (error) {
        console.error('Hiba a POST során:', error)
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500 })
    }
}

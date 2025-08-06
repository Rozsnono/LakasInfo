// app/api/users/route.ts
import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const client = await clientPromise;
    const db = client.db('lakasinfo');
    const homeId = new URL(req.url).searchParams.get('homeId') || '';

    if (!homeId) {
        return NextResponse.json({ error: 'Home ID is required' }, { status: 200 });
    }

    const services = await db.collection('services').findOne({ homeId: new mongoose.Types.ObjectId(homeId) });
    if (!services) {
        return NextResponse.json({ error: 'Szolgáltatás nem található' }, { status: 404 });
    }

    const serviceData = services.services.map((service: any) => {
        return {
            name: service.name,
            measurement: service.measurement,
            average: service.average,
        };
    });

    return NextResponse.json(serviceData || { error: 'Szolgáltatás nem található' });
}
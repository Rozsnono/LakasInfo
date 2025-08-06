// app/api/users/route.ts
import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

// Reusable CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

// GET - Get payment data by year, homeId, and type
export async function GET(req: Request) {
    const client = await clientPromise;
    const db = client.db('lakasinfo');

    const year = new URL(req.url).searchParams.get('year') || '';
    const homeId = new URL(req.url).searchParams.get('homeId') || '';
    const type = new URL(req.url).searchParams.get('type') || 'electricity';

    const payments = await db.collection('payments').findOne({ homeId: new mongoose.Types.ObjectId(homeId) });
    if (!payments) {
        return NextResponse.json({ error: 'Kifizetés nem található' }, { status: 404, headers: corsHeaders });
    }

    const paymentData = payments.payments.map((payment: any) => {
        const data = Object.entries(payment.data).filter(([date]) => date.startsWith(year));
        const yearlyAverage = (Object.values(data).map((d) => d[1])).reduce((acc: number, val: any) => acc + (val.difference || 0), 0) / data.length || 0;

        return {
            name: payment.name,
            measurement: payment.measurement,
            data: Object.fromEntries(data),
            average: payment.average,
            yearly_average: yearlyAverage,
            years: Object.keys(payment.data)
                .map(date => date.split('-')[0])
                .filter((value, index, self) => self.indexOf(value) === index)
                .sort((a, b) => parseInt(a) - parseInt(b)),
        };
    });

    return NextResponse.json(
        paymentData.find((s: any) => s.name === type) || { error: 'Kifizetés nem található' },
        { headers: corsHeaders }
    );
}

// POST - Add new payment data
export async function POST(req: Request) {
    try {
        const client = await clientPromise
        const db = client.db('lakasinfo')

        const body = await req.json()

        if (!body.date || !body.value || !body.paymentName || !body.homeId) {
            return NextResponse.json({ error: 'Dátum, érték, kifizetés és lakás szükséges' }, { status: 400, headers: corsHeaders })
        }

        const payment = await db.collection('payments').findOne({ homeId: new mongoose.Types.ObjectId(body.homeId) });
        if (!payment) {
            return NextResponse.json({ error: 'Kifizetés nem található' }, { status: 404, headers: corsHeaders })
        }

        const date = new Date(body.date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const prevDate = new Date(date);
        prevDate.setMonth(prevDate.getMonth() - 1);
        const formattedPrevDate = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

        const target = payment.payments.find((s: any) => s.name === body.paymentName);
        if (!target) {
            return NextResponse.json({ error: 'Kifizetés nem található a megadott névvel' }, { status: 404, headers: corsHeaders });
        }

        const previousValue = target.data[formattedPrevDate]?.value || body.value;
        target.data[formattedDate] = {
            value: body.value,
            difference: body.value - previousValue
        };

        const differences = Object.values(target.data).map((d: any) => d.difference || 0);
        target.average = differences.reduce((acc: number, val: number) => acc + val, 0) / differences.length;

        const resultpayments = await db.collection('payments').replaceOne(
            { homeId: new mongoose.Types.ObjectId(body.homeId) },
            payment
        );

        return NextResponse.json({ success: true, count: resultpayments.modifiedCount }, { headers: corsHeaders });

    } catch (error) {
        console.error('Hiba a POST során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers: corsHeaders });
    }
}

// OPTIONS - Handle preflight CORS requests
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

// app/api/users/route.ts
import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

// GET - Fetch all homes
export async function GET() {
    const client = await clientPromise;
    const db = client.db('lakasinfo');
    const houses = await db.collection('home').find().toArray();

    return NextResponse.json(houses, { headers: corsHeaders });
}

// POST - Create new home with services and payments
export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('lakasinfo');
        const body = await req.json();

        if (!body.name || body.services.length === 0) {
            return NextResponse.json({ error: 'Név szükséges' }, { status: 400, headers: corsHeaders });
        }

        const result = await db.collection('home').insertOne({
            name: body.name,
            description: body.description || '',
            address: body.address || '',
            type: body.type || 'house',
            services: body.services.map((s: any) => s.value),
            payments: body.payments.map((p: any) => p.value.split('_')[0]),
            createdAt: new Date(),
        });

        const services = {
            homeId: result.insertedId,
            services: body.services.map((service: { value: string, unit?: string }) => ({
                name: service.value,
                measurement: service.unit || 'kWh',
                data: {},
                average: 0,
            })),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await db.collection('services').insertOne(services);

        const payments = {
            homeId: result.insertedId,
            payments: body.payments.map((payment: { value: string, unit?: string }) => ({
                name: payment.value.split('_')[0],
                measurement: payment.unit || 'Ft',
                data: {},
                average: 0,
            })),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await db.collection('payments').insertOne(payments);

        return NextResponse.json({ success: true, id: result.insertedId }, { headers: corsHeaders });

    } catch (error) {
        console.error('Hiba a POST során:', error);
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500, headers: corsHeaders });
    }
}

// OPTIONS - Handle CORS preflight
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

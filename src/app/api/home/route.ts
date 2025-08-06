// app/api/users/route.ts
import clientPromise from '@/lib/mongodb'
import mongoose from 'mongoose';
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const origin = req.headers.get('origin') || '*';

    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    const client = await clientPromise;
    const db = client.db('lakasinfo');
    const homeId = new URL(req.url).searchParams.get('homeId') || '';

    if (!homeId) {
        return NextResponse.json(
            { error: 'Home ID is required' },
            { status: 200, headers }
        );
    }

    const services = await db.collection('services').findOne({ homeId: new mongoose.Types.ObjectId(homeId) });
    if (!services) {
        return NextResponse.json(
            { error: 'Szolgáltatás nem található' },
            { status: 404, headers }
        );
    }

    const serviceData = services.services.map((service: any) => {
        return {
            name: service.name,
            measurement: service.measurement,
            average: service.average,
        };
    });

    return NextResponse.json(serviceData, { headers });
}

// Optional: Handle preflight OPTIONS request
export async function OPTIONS(req: Request) {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

// app/api/users/route.ts
import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
    const client = await clientPromise;
    const db = client.db('lakasinfo');
    const houses = await db.collection('home').find().toArray();

    return NextResponse.json(houses);
}


export async function POST(req: Request) {
    try {
        const client = await clientPromise
        const db = client.db('lakasinfo')

        const body = await req.json()

        if (!body.name || body.services.length === 0) {
            return NextResponse.json({ error: 'Név szükséges' }, { status: 400 })
        }

        const result = await db.collection('home').insertOne({
            name: body.name,
            description: body.description || '',
            address: body.address || '',
            type: body.type || 'house',
            services: body.services.map((s) => s.value),
            createdAt: new Date(),
        })

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
        }
        const resultServices = await db.collection('services').insertOne(services);

        return NextResponse.json({ success: true, id: result.insertedId })
    } catch (error) {
        console.error('Hiba a POST során:', error)
        return NextResponse.json({ error: 'Szerverhiba' }, { status: 500 })
    }
}

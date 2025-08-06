// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://admin:admin@personalthings.whiebq7.mongodb.net/?retryWrites=true&w=majority&appName=PersonalThings'
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (!uri) {
    throw new Error('⚠️ MONGODB_URI nincs beállítva a környezeti változókban')
}

// Fejlesztés alatt megőrizzük a kapcsolatot globálisan, hogy ne nyisson újra
declare global {
    var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri!, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri!, options)
    clientPromise = client.connect()
}

export default clientPromise

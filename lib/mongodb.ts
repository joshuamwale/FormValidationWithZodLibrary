import { MongoClient } from 'mongodb';

// MongoDB URI and Database Name
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Define and add your MONGODB_URI environment variable');
}
if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environment variable');
}

let clientPromise: Promise<MongoClient>; //awaiting the MongoDB connection

if (process.env.NODE_ENV === 'development') {
  // Development mode, using a global variable to avoid reconnecting during reload
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(MONGODB_URI); 

  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production, use the default MongoClient connection
  clientPromise = MongoClient.connect(MONGODB_URI);
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(MONGODB_DB);
  return {client, db };
}

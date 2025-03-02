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

//awaiting the MongoDB connection
// In Production, use the default MongoClient connection


const clientPromise: Promise<MongoClient> = MongoClient.connect(MONGODB_URI);

export async function connectMongoDB() {
  const client = await clientPromise;
  const db = client.db(MONGODB_DB);
  return {client, db };
} 

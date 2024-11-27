import { MongoClient } from "mongodb"

let client
let clientPromise
const URI = process.env.MONGODB_URI
const options = {}

if (!URI) {
  throw new Error("Please add your MongoDB URI to the .env file")
}


if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the MongoClient instance is not recreated.
  if (!global._mongoClientPromise) {
    client = new MongoClient(URI, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(URI, options)
  clientPromise = client.connect()
}

async function getDatabase() {
  const client = await clientPromise
  return client.db("MyDatabase")
}

export async function getCollection(collectionName) {
  const db = await getDatabase()
  return db.collection(collectionName)
}

export default getDatabase
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

//cached :singleton
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function mongoConnection(): Promise<mongoose.Connection|undefined> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {//Évite les connexions multiples
    if (MONGODB_URI) {
      cached.promise = mongoose
        .connect(MONGODB_URI)
        .then((mongoose) => mongoose.connection);
    }

    cached.conn = await cached.promise;//Attend la promesse de connexion
    console.log("MongoDB connected");

    return cached.conn;
  }

}

  export default mongoConnection;

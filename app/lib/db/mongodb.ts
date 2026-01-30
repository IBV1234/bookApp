import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Global is required to prevent multiple connections in dev same thins as windows variable
//Global is used here to maintain a cached connection across hot reloads in development it's like a singleton
// Otherwise, a new connection is created on every request which can exhaust database connections
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

  if (!cached.promise) {
    if (MONGODB_URI) {
      cached.promise = mongoose
        .connect(MONGODB_URI)
        .then((mongoose) => mongoose.connection);
    }

    cached.conn = await cached.promise;
    console.log("MongoDB connected");

    return cached.conn;
  }

}

  export default mongoConnection;

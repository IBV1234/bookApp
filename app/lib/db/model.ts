import mongoose, { Schema, Model } from "mongoose";

function getModel<T>(name: string, schema: Schema<T>): Model<T> {
    return (mongoose.models?.[name] as Model<T>) || mongoose.model<T>(name, schema)
}

const bookSubSchema = new Schema({
  title: { type: String, required: true },
  detail: {
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    maisonEdition: { type: String, required: true },
    dessinator: { type: String },
    periodicite: { type: String },
  },
  dispo: { type: Number, required: true },
  prix: { type: Number, required: true },
  type: { type: String, required: true }
}, { _id: false });

const userSchema = new Schema({
  _id: { type: String, required: false },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  booksWritten: { type: [bookSubSchema], default: [] }
}, { collection: 'users' });

export const DbUser = getModel('User', userSchema);
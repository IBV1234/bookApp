import z from "zod";
import { omit } from "zod/v4-mini";

export type Book = {
    title: string;
    author: string;
    publishedYear: number;
    pages: number;
    type: string;
}
type booksBought = Pick<Book, 'title' | 'author'| 'type'>[];
export type  User = {
    name: string;
    username: string;
    booksBought:  booksBought[];
}

export const userShema =  z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").transform(val => val.trim()),
    username: z.string().min(3, "Username must be at least 3 characters long").transform(val => val.trim()),
    booksBought: z.array(z.object({
        title: z.string(),
        author: z.string(), 
        publishedYear: z.number(),
        pages: z.number(),
        type: z.string()
    }))
})
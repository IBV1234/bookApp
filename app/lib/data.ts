import { User, Book } from '../lib/types/data';
import { DbUser } from './db/model';

export async function addUser(user: User): Promise<boolean> {
    try {
        const findedUser = await DbUser.findOne({ username: user.username });
        if (!findedUser) {
            console.log("user :", user);

            await DbUser.create(user);
            return true;
        }
        await addBooksToUser(user);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}


export async function addBooksToUser(user: User): Promise<boolean> {
    try {
        const updatedUser = await DbUser.findOneAndUpdate(
            { username: user.username },
            { $push: { booksWritten: { $each: user.booksWritten || [] } } },//$each to add multiple books at once
            { new: true } // Return the updated document

        );
        console.log("Document updated: ", updatedUser);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}


export async function getBook(): Promise<Book[]> {
    try {
        console.log("books:");

        const booksUers = await DbUser.find();
        console.log("books:", booksUers);
        const books: Book[] = booksUers.flatMap((u: User) => u.booksWritten ?? []);
        console.log("books detailBook:", books);
        if (!books || books.length === 0) {
            console.log("No books found in the database.");
            return [];
        }
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
}   

import { app } from './db/fireBaseConfig';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc,deleteDoc } from 'firebase/firestore';
import { User,Book } from '../lib/types/data';
const collectionName = 'users' as const;
const db = getFirestore(app);

export async function addUser(user: User): Promise<boolean>  {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            name: user.name,
            username: user.username,
            booksBought: []
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
        } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}


export async function addBooks(books: Book): Promise<boolean>  {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            title: books.title,
            author: books.author,
            publishedYear: books.publishedYear,
            pages: books.pages,
            type: books.type
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
        } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}


export async function getUserByUserName(clientName: string): Promise<unknown | null> {
    const user = await getDoc(doc(db, collectionName, clientName));
    if (user.exists()) {
        return user.data();
    }
    return null;
}

export async function updateUser(docId: string, data: Partial<User>): Promise<boolean> {
    try {
        await updateDoc(doc(db, collectionName, docId), data);
        return true;
    }
    catch (error) {
        console.error("Error updating document: ", error);
        return false;
    }
}

export async function deleteUsers( docId:string|number) :Promise<boolean>{
    try {
        await deleteDoc(doc(db, collectionName, docId.toString()));
        return true;
    } catch (error) {
        console.error("Error deleting document: ", error);
        return false;
    }
}


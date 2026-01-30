import { User,Book } from '../lib/types/data';
import { DbBook,DbUser } from './db/model';

export async function addUser(user: User): Promise<boolean>  {
    try {
        console.log("user addUser:",user);  
         await DbUser.create(user);
        const  findedUser = await DbUser.findOne({username: user.username});
        if(!findedUser){
            console.error("Error finding the newly created user.");
            return false; 
        }
        console.log("Document written with ID: ", findedUser._id);
        return true;
    }catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}


// export async function addBooks(books: Book): Promise<boolean>  {
//     try {
     
//         // console.log("Document written with ID: ", docRef.id);
//         return true;
//         } catch (e) {
//         console.error("Error adding document: ", e);
//         return false;
//     }
// }


// export async function getUserByUserName(clientName: string): Promise<unknown | null> {
 
//     return null;
// }

// export async function updateUser(docId: string, data: Partial<User>): Promise<boolean> {
//     try {
        
//     }
//     catch (error) {
//         console.error("Error updating document: ", error);
//         return false;
//     }
// }

// export async function deleteUsers( docId:string|number) :Promise<boolean>{
//     try {
    
//     } catch (error) {
//         console.error("Error deleting document: ", error);
//         return false;
//     }
// }


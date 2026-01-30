import z from "zod";

export type detailBook = {
    author: string;
    publishedYear: number;
    maisonEdition: string;
    dessinator?: string;
    periodicite?: string;
}
export type Book = {
    title: string;
    detail: detailBook;
    dispo: number;
    prix: number;
    type: 'periodique' | 'bd' | 'livre';
}

export type User = {
    _id?: string;
    name: string;
    username: string;
    booksWritten?: Book[];
}

export const userShema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").transform(val => val.trim()),
    username: z.string().min(3, "Username must be at least 3 characters long").transform(val => val.trim()),

    booksWritten: z.array(z.object({
        title: z.string(),
        detail: z.object({
            author: z.string(),
            publishedYear: z.number(),
            maisonEdition: z.string(),
            dessinator: z.string().optional(),
            periodicite: z.string().optional(),
        }),

        dispo: z.number(),
        prix: z.number(),
        type: z.enum(['periodique', 'bd', 'livre']),
    })).optional(),

})
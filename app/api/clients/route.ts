import { NextResponse, NextRequest } from 'next/server';
import { addUser} from '@/app/lib/data';
import mongoConnection from '@/app/lib/db/mongodb';
import { User } from '@/app/lib/types/data';

export async function POST(request: NextRequest) {
    try {
        await mongoConnection();
        const user: User = await request.json();
        console.log(user);
        const success = await addUser(user);
        if (!success) {
            return NextResponse.json({ error: 'Failed to add user' }, { status: 400 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (e) {
        console.error('Error adding user:', e);
        return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await mongoConnection();
        // Code pour récupérer les utilisateurs si nécessaire
        return NextResponse.json({ message: 'GET method for clients' }, { status: 200 });
    } catch (e) {
        console.error('Error fetching clients:', e);
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}
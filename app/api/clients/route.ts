import { NextResponse, NextRequest } from 'next/server';
import { getUserByUserName} from '@/app/lib/data';

export async function GET(request: NextRequest) {

    try {
            const user =  await getUserByUserName('test');
            console.log(user);
            if (!user || Object.keys(user).length === 0) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json(user,{status:200});
    }catch (e) {
            console.error('Error fetching clients:', e);
            return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
        }
    
}
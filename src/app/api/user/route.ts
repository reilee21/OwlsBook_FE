import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { searchParams } = new URL(req.url!, `http://${req.headers.host}`);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
        const email = searchParams.get('email');

        let userlist;
        if (email) {
            userlist = await clerkClient.users.getUserList({ emailAddress: email });
        } else {
            const offset = (page - 1) * pageSize;
            userlist = await clerkClient.users.getUserList({ limit: pageSize, offset });
        }

        return NextResponse.json(userlist);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

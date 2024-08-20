import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import {useGetStaffQuery} from '@/services/acccount/accountApi'
export async function POST(req: NextApiRequest, res: NextApiResponse) {
        const data  = await req.json()
        const mails = data.listStaffEmail;
     
        const page =data.page;
        const pageSize = data.pageSize
    try {

        const offset = (page - 1) * pageSize;
        const userList = await clerkClient.users.getUserList({ emailAddress: mails, limit: pageSize, offset });
        return NextResponse.json(userList);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
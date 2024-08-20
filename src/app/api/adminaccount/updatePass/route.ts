import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
export async function POST(req: NextApiRequest, res: NextApiResponse) {
        const data  = await req.json()
        const newPass = data.newPass;
        const acc = data.accId;

    try {

        const rs = await clerkClient.users.updateUser(acc,{password:newPass})
        return NextResponse.json(rs);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
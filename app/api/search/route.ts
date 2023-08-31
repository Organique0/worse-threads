// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { SearchUsers } from '@/lib/actions/search.actions';
import { NextResponse } from 'next/server';
import User from "@/lib/models/user.model";
import { connectToDB } from '@/lib/mongoose';

export async function GET(req: Request, res: NextApiResponse) {
    const { searchParams } = new URL(req?.url)
    const query = searchParams.get('query')
    connectToDB();
    const result = await User.find({
        name: {
            $regex: query,
            $options: 'i',
        }
    }).exec();
    return NextResponse.json(result);
}

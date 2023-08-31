import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoose";

export async function SearchUsers(query: string) {
    connectToDB();
    const result = await User.find({
        name: {
            $regex: query,
            $options: 'i',
        }
    }).exec();

    return result;
}
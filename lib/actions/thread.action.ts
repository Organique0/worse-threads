"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose, { ObjectId } from "mongoose";

interface createThreadParams {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({ text, author, communityId, path }: createThreadParams) {
    connectToDB();

    const createdThread = await Thread.create({
        text,
        author: mongoose.Types.ObjectId.createFromHexString(author),
        community: null,
    });

    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id }
    })

    revalidatePath(path);
}
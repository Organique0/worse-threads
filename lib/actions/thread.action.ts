"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import mongoose, { ObjectId } from "mongoose";
import { skip } from "node:test";
import Community from "../models/community.model";

interface createThreadParams {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({ text, author, communityId, path }: createThreadParams) {
    connectToDB();

    const communityIdObject = await Community.findOne(
        { id: communityId },
        { _id: 1 }
    );

    const createdThread = await Thread.create({
        text,
        author: mongoose.Types.ObjectId.createFromHexString(author),
        community: communityIdObject,
    });

    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id }
    })

    if (communityIdObject) {
        await Community.findByIdAndUpdate(communityIdObject, {
            $push: { threads: createdThread._id }
        })
    }

    revalidatePath(path);
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Thread.
        find({
            parendId: {
                $in: [null, undefined]
            }
        })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .populate({ path: "author", model: User })
        .populate({ path: "community", model: Community })
        .populate({ path: "children", populate: { path: "author", model: User, select: "_id name parentId image" } })

    const totalPostsCount = await Thread.countDocuments({
        parendId: {
            $in: [null, undefined]
        }
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext }
}

export async function fetchThreadById(id: string) {
    connectToDB();
    try {
        const thread = await Thread.findById(id)
            .populate([{
                path: "author",
                model: User,
                select: "_id id name image"
            }, {
                path: "community",
                model: Community,
                select: "id name image"
            }])
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            });
        return thread;
    } catch (error) {
        throw new Error("error fetching a thread")
    }
}

export async function addCommentToThread(threadId: string, commentText: string, userId: string, path: string, organizationId?: string) {
    connectToDB();
    const communityIdObject = await Community.findOne(
        { id: organizationId },
        { _id: 1 }
    );
    try {
        const originalThread = await Thread.findById(threadId);
        if (!originalThread) throw new Error("thread not found");

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
            community: communityIdObject,


        });

        const savedCommentThread = await commentThread.save();

        originalThread.children.push(savedCommentThread._id);

        await originalThread.save();
        revalidatePath(path);
    } catch (error) {
        throw new Error("erorr adddin comment")
    }
}
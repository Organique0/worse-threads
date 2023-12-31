"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { CommentValidation } from "@/lib/validations/thread";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react";
import { updateUser } from "@/lib/actions/user.actions";
import { addCommentToThread, createThread } from "@/lib/actions/thread.action";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";

interface CommentProps {
    postId: string,
    currentUserImage: string,
    currentUserId: string,
}


export default function Comment({ postId, currentUserImage, currentUserId }: CommentProps) {
    const { organization } = useOrganization();

    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        }
    });

    async function onSubmit(values: z.infer<typeof CommentValidation>) {
        await addCommentToThread(postId, values.thread, JSON.parse(currentUserId), pathname, organization?.id)

        form.reset();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex gap-3 w-full items-center">
                            <FormLabel>
                                <Image src={currentUserImage} alt="image" width={48} height={48} className="rounded-full object-cover" />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input
                                    type="text"
                                    placeholder="comment.."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="comment-form_btn">Reply</Button>
            </form>
        </Form>
    )
}
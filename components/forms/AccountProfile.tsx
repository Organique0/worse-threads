"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { useUploadThing } from "@/lib/uploadthing";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button"
import Image from "next/image";
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
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";


interface AccoutProfileProps {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: AccoutProfileProps) {
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("imageUploader");
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            username: user?.username || "",
            name: user?.name || "",
            bio: user?.bio || "",
            image: user?.image || "",
        }
    });
    async function onSubmit(values: z.infer<typeof UserValidation>) {
        const blob = values.image;

        const hasImageChanged = isBase64Image(blob);

        if (hasImageChanged) {
            const imgRes = await startUpload(files);
            if (imgRes && imgRes[0].url) {
                values.image = imgRes[0].url;
            }
        }

        //TODO: Update the user
    }

    function uploadImage(e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (e) => {
                const imageDataUrl = e.target?.result?.toString() || '';

                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (
                                    <Image src={field.value} alt="profile photo" width={100} height={100} priority className="rounded-full object-contain" />
                                ) : (
                                    <Image src={"/assets/profile.svg"} alt="profile photo" width={25} height={25} className="object-contain" />
                                )}
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload a photo"
                                    className="account-form_image-input"
                                    onChange={(e) => uploadImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>
                            <FormControl className="">
                                <Input
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Username
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    )
}
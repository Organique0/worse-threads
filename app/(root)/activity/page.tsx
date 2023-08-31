import React from 'react'
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import UserCard from '@/components/cards/UserCard';
const page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onBoarded) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

    return (
        <section>
            <h1 className='head-text mb-10'>
                activity
            </h1>
            <section className='mt-10 flex flex-col gap-5'>
                {activity.length > 0
                    ? (<>
                        {
                            activity.map(activity => (
                                <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                    <article className='activity-card'>
                                        <Image src={activity.author.image}
                                            alt='profile image'
                                            height={20}
                                            width={20}
                                            className='rounded-full object-cover'
                                        />
                                        <p className='!text-small-regular text-light-1'>
                                            <span className='mr-1 text-primary-500'>{activity.author.name}</span>
                                            replied to your thread
                                        </p>
                                    </article>
                                </Link>
                            ))
                        }
                    </>)
                    : <p className='!text-base-regular text-light-3'>no activity yet</p>
                }
            </section>
        </section>
    )
}

export default page
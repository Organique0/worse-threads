"use client";
import React, { useCallback, useEffect, useState } from 'react'
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserCard from '@/components/cards/UserCard';
import { Input } from '@/components/ui/input';
import { SearchUsers } from '@/lib/actions/search.actions';
import axios from "axios";
import { Button } from '@/components/ui/button';

const page = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<User[]>([]);
    const [mounted, setMounted] = useState(false);

    const calculate = useCallback(async (query: string) => {
        if (query.trim() !== '') {
            try {
                const response = await axios.get(`/api/search?query=${query}`);
                setResult(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setResult([]);
        }
    }, []);

    useEffect(() => {
        calculate(query);
    }, [query, calculate])

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <>
            {mounted && (
                <section>
                    <h1 className='head-text mb-10'>Search users</h1>
                    <div className='mt-4 flex'>
                        <Input
                            type='search'
                            placeholder='Search by user name'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete='off'
                        />

                    </div>
                    <div className='mt-14 flex flex-col gap-9'>
                        {query.trim() !== '' && result.length > 0 && result.map((user) => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                username={user.username}
                                name={user.name}
                                imgUrl={user.image as string}
                                personType=''
                            />
                        ))}
                    </div>
                </section>
            )
            }</>

    )
};

export default page;
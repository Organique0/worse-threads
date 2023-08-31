"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";


function Searchbar() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    // query after 0.3s of no input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                router.push(`/communities?search=` + search);
            } else {
                router.push(`/communities`);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className='searchbar'>
            <Input
                id='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search communities"}
                className='no-focus searchbar_input'
            />
        </div>
    );
}

export default Searchbar;
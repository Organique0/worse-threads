import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import Community from "@/lib/models/community.model";

interface ThreadsTabProps {
    currentUserId: string;
    accountId: string;
    accountType: string;
}


const ThreadsTab = async ({ currentUserId, accountId, accountType }: ThreadsTabProps) => {
    let result: any;
    if (accountType === "Community") {
        result = await fetchCommunityPosts(accountId)
    } else {
        result = await fetchUserPosts(accountId);
    }

    //result.threads.map((t: any) => { console.log(t) });

    if (!result) redirect("/");

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    currentUserId={currentUserId}
                    id={thread._id}
                    parentId={thread.parentId}
                    text={thread.text}
                    author={
                        accountType === "User"
                            ? { name: result.name, image: result.image, id: result.id }
                            : { name: thread.author.name, image: thread.author.image, id: thread.author.id }
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.comments}
                />
            ))}
        </section>
    )
}

export default ThreadsTab;
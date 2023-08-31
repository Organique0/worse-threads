import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface ThreadsTabProps {
    currentUserId: string;
    accountId: string;
    accountType: string;
}


const ThreadsTab = async ({ currentUserId, accountId, accountType }: ThreadsTabProps) => {
    let result = await fetchUserPosts(accountId);

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
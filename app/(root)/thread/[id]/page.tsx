import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onBoarded) redirect("/onboarding");

    const post = await fetchThreadById(params.id);

    return (
        <section className="relative">
            <div className="">
                <ThreadCard
                    key={post._id}
                    currentUserId={user?.id}
                    id={post._id}
                    parentId={post.parentId}
                    text={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.comments}
                />
            </div>

            <div className="mt-7">
                <Comment
                    postId={post.id}
                    currentUserImage={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10">
                {post.children.map((item: any) => (
                    <ThreadCard
                        key={item._id}
                        currentUserId={item?.id}
                        id={item._id}
                        parentId={item.parentId}
                        text={item.text}
                        author={item.author}
                        community={item.community}
                        createdAt={item.createdAt}
                        comments={item.comments}
                        isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;
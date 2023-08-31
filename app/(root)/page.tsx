import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";



export default async function Home() {

  const result = await fetchPosts(1, 30);
  const user = await currentUser();



  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? <p>No posts found</p> :
          <>
            {result.posts.map((post) => {

              return (
                < ThreadCard
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
              )
            }

            )}
          </>
        }
      </section>
    </div>
  )
}
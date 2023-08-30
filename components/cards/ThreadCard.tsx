import Image from "next/image";
import Link from "next/link";

interface ThreadCardProps {
    id: string;
    parentId: string | null;
    text: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[];
    isComment?: boolean;
    currentUserId: string | undefined;
}

const ThreadCard = ({ id, currentUserId, parentId, comments, author, community, createdAt, text, isComment }: ThreadCardProps) => {
    return (
        <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="w-11 relative h-11">
                            <Image src={author.image} fill alt="profile image" className="cursor-pointer rounded-full" />
                        </Link>

                        <div className="thread-card_bar" />
                    </div>

                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">{text}</p>
                        <div className={`${isComment && "mb-10"} "mt-5 flex flex-col gap-3"`}>
                            <div className="flex gap-3.5">
                                <Link href={`/thread/${id}`}>
                                    <Image src="/assets/reply.svg" width={24} height={24} alt="reply" className="cursor-ponter object-contain" />
                                </Link>
                                <Image src="/assets/heart-gray.svg" width={24} height={24} alt="heart" className="cursor-ponter object-contain" />
                                <Image src="/assets/repost.svg" width={24} height={24} alt="repost" className="cursor-ponter object-contain" />
                                <Image src="/assets/share.svg" width={24} height={24} alt="share" className="cursor-ponter object-contain" />
                            </div>
                            {isComment && comments?.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadCard;
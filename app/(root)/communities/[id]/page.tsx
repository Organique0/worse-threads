import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";

import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";



const Page = async ({ params }: { params: { id: string } }) => {
    const user = await currentUser();
    if (!user) return null;

    const communityDetails = await fetchCommunityDetails(params.id);

    return (
        <section>
            <ProfileHeader
                accountId={communityDetails.id}
                authUserId={user.id}
                name={communityDetails.name}
                username={communityDetails.username}
                imgUrl={communityDetails.image}
                bio={communityDetails.bio}
                type="Community"
            />
            <div className="mt-9">
                <Tabs defaultValue="Threads" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} className="tab" value={tab.value}>
                                <Image width={24} height={24} alt={tab.label} src={tab.icon} className="object-contain" />
                                <p className="max-sm-hidden">{tab.label}</p>
                                {tab.label === "Threads" && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {communityDetails.threads.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent
                        value="threads"
                        className="w-full text-light-1">
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={communityDetails.id}
                            accountType="Community"
                        />
                    </TabsContent>
                    <TabsContent
                        value="members"
                        className="w-full text-light-1">
                        <section className="mt-9 flex flex-col gap-10">
                            {communityDetails?.members.map((member: any) => (
                                <UserCard key={member.id} id={member.id} name={member.name} personType="User" username={member.name} imgUrl={member.image} />
                            ))}
                        </section>
                    </TabsContent>
                    <TabsContent
                        value="requests"
                        className="w-full text-light-1">
                        <ThreadsTab
                            currentUserId={user.id}
                            accountId={communityDetails.id}
                            accountType="Community"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default Page;
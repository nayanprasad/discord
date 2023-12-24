import React from 'react';
import {db} from "@/lib/db";
import {getCurrentProfile} from "@/lib/current-profile";
import {getOrCreateConversation} from "@/lib/conversation";
import {redirectToSignIn} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import ChatHeader from "@/components/chat/chat-header";

interface MemberIdPageProps {
    params: {
        serverId: string,
        memberId: string,
    }
}

const Page = async ({params}: MemberIdPageProps) => {
    const profile = await getCurrentProfile();

    if(!profile)
        return redirectToSignIn();

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    })

    if(!currentMember)
        return redirect("/");

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);


    if(!conversation)
        return redirect(`/servers/${params.serverId}`);


    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;


    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={params.serverId}
                type="conversation"
            />
        </div>
    );
};

export default Page;

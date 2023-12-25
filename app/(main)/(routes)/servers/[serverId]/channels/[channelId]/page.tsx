import React from 'react';
import {redirectToSignIn} from "@clerk/nextjs";
import {getCurrentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";


interface ChannelIdPageProps {
    params: {
        serverId: string,
        channelId: string,
    }
}

const Page = async ({params}: ChannelIdPageProps) => {

    const profile = await getCurrentProfile();

    if(!profile)
        return redirectToSignIn();

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    });

    const member = await db.member.findFirst({
        where: {
            profileId: profile.id,
            serverId: params.serverId,
        }
    });

    if(!channel || !member)
        redirect("/");

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <div className="flex-1">Future messages</div>
            <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
            />
        </div>
    );
};

export default Page;

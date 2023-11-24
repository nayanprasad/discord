import React from 'react';
import {redirect} from "next/navigation";
import {redirectToSignIn} from "@clerk/nextjs";
import {getCurrentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {MemberRole, ChannelType} from "@prisma/client";

import ServerHeader from "@/components/server/server-header";


const ServerSidebar = async ({serverId}: { serverId: string }) => {

    const profile = await getCurrentProfile();

    if (!profile)
        return redirectToSignIn();

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    name: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }

            }
        }
    });

    if (!server)
        return redirect("/");

    const members = server?.members.filter((member) => member.profileId!== profile.id);
    const role = server?.members.find((member) => member.profileId === profile.id)?.role;
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);


    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader />
            {serverId}
        </div>
    );
};

export default ServerSidebar;

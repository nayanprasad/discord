import React, {Fragment} from 'react';
import {db} from "@/lib/db";
import {initialProfile} from "@/lib/initial-profile";
import {redirect} from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

const Page = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id

                }
            }
        }
    });

    if (server && server.id) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <InitialModal/>
    );
};

export default Page;

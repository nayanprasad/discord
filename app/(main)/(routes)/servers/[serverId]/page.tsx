import {redirect} from "next/navigation";
import {getCurrentProfile} from "@/lib/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";

interface ServerIdPageProps {
    params: {
        serverId: string,
    }
}

const ServerIdPage = async ({params}: ServerIdPageProps) => {

    const profile = await getCurrentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general",
                },
                orderBy: {
                    createdAt: "asc",
                }
            }
        }
    });

    console.log(server);


    const initialChannel = server?.channels[0];


    if (initialChannel?.name !== "general")
        return null;


    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
};

export default ServerIdPage;

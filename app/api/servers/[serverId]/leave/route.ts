import {NextResponse} from "next/server";
import {getCurrentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";


export async function PATCH(Req: Request, {params} : {params: {serverId: string}}) {
    try {
        const profile = await getCurrentProfile();

        if (!profile)
            return new NextResponse("Unauthorized", {status: 401});

        if(!params.serverId)
            return new NextResponse("Bad Request", {status: 400});

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id   // those who are not the owner of the server can't leave it
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Successfully left the server",
            server
        }, {status: 200});
    } catch (e) {
        console.log("LEAVE_SERVER_PATCH: ", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

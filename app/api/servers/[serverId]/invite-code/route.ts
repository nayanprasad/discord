import {NextResponse} from "next/server";
import {getCurrentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {v4 as uuidv4} from "uuid";


export async function PATCH(req: Request, {params}: { params: { serverId: string }}) {
    try {
        const profile = await getCurrentProfile();

        if(!profile)
            return new NextResponse("Unauthorized", {status: 401});

        if(!params.serverId)
            return new NextResponse("Server id missing", {status: 400});

        const server = await db.server.update({
            where: {
                id: params.serverId
            },
            data: {
                inviteCode: uuidv4()
            }
        })

        return NextResponse.json({
            success: true,
            message: "invite code updated",
            server
        }, {status: 200});

    } catch (e) {
        console.log("SERVER INVITE CODE PATCH ERROR: ", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}

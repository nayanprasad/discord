import {NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import {db} from "@/lib/db";
import {getCurrentProfile} from "@/lib/current-profile";
import {MemberRole} from "@prisma/client";


export async function POST(req: Request) {
    try {
        const {name, imageUrl} = await req.json();
        const profile = await getCurrentProfile();

        if (!profile)
            return new NextResponse("Unauthorized", {status: 401});

        const server = await db.server.create({
            data: {
                name,
                imageUrl,
                profileId: profile.id,
                inviteCode: uuidv4(),
                channels: {
                    create: [{
                        name: "general",
                        profileId: profile.id,
                    }]
                },
                members: {
                    create: [{
                        profileId: profile.id,
                        role: MemberRole.ADMIN
                    }]
                }
            }
        })

        return NextResponse.json({
            success: true,
            message: "servers created",
            server
        }, {status: 201});

    } catch (e) {
        console.log("SERVERS_POST", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


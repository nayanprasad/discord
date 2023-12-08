import {NextResponse} from "next/server";
import {getCurrentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {MemberRole} from "@prisma/client";


export async function POST(req: Request) {
    try {
        const profile = await getCurrentProfile();
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Name cannot be 'general'", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    }
                }
            }
        });
        return NextResponse.json({
            success: true,
            message: "channel created",
            server
        }, {status: 200});
    } catch (e) {
        console.log("[CHANNELS_SERVER_ID_POST]", e);
        return new NextResponse("Internal Error", {status: 500});
    }
}

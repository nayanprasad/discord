import {getCurrentProfile} from "@/lib/current-profile";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {MemberRole} from "@prisma/client";

export async function DELETE(req: Request, { params }: { params: { channelId: string }}) {
    try {
        const profile = await getCurrentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        console.log("[DELETE_CHANNEL]", serverId, params.channelId)

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Channel deleted",
            server
        }, { status: 200 });

    } catch (error) {
        console.log("[CHANNEL_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH(req: Request, { params }: { params: { channelId: string }}) {
    try {
        const { name, type } = await req.json();
        const profile = await getCurrentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        console.log("[DELETE_CHANNEL]", serverId, params.channelId)

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.channelId,
                        },
                        data: {
                            name,
                            type,
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Channel deleted",
            server
        }, { status: 200 });

    } catch (error) {
        console.log("[CHANNEL_EDIT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



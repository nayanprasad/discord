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

        const {name, imageUrl} = await Req.json();

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        });

        return NextResponse.json({
            success: true,
            message: "server updated",
            server
        }, {status: 200});
    } catch (e) {
        console.log("EDIT SERVER ERROR: ", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


export async function DELETE(req: Request, { params }: { params: { serverId: string }}) {
    try {
        const profile = await getCurrentProfile();

        if (!profile)
            return new NextResponse("Unauthorized", { status: 401 });

        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Server deleted",
            server
        }, { status: 200 });

    } catch (error) {
        console.log("[SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


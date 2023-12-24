import {NextResponse} from "next/server";


export async function GET(req: Request) {
    try {
        return NextResponse.json({
            success: true,
            message: "Hello World",
        }, {status: 200});
    } catch (e) {
        console.log("TEST_GET", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


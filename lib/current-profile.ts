import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export const getCurrentProfile = async () => {
    const {userId} = await auth();

    if(!userId)
        return null;

    const profile = await db.profile.findFirst({
        where: {
            userId
        }
    });

    return profile;
}



import { UserButton } from "@clerk/nextjs";
import {ModeToggle} from "@/components/theme-toggle";


export default function Home() {
    return (
        <div>
            <h1 className="text-red-700">Home</h1>
            <UserButton afterSignOutUrl="/"/>

            <ModeToggle/>

        </div>
    )
}

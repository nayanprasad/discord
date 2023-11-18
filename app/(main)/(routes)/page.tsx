import { UserButton } from "@clerk/nextjs";


export default function Home() {
    return (
        <div>
            <h1 className="text-red-700">Home</h1>
            <UserButton afterSignOutUrl="/"/>

        </div>
    )
}

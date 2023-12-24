import type {Metadata} from 'next'
import {Open_Sans} from 'next/font/google'
import './globals.css'
import {ClerkProvider} from '@clerk/nextjs'
import {ThemeProvider} from "@/components/providers/theme-provider";
import {ModalProviders} from "@/components/providers/modal-providers";
import {cn} from "@/lib/utils";
import {SocketProvider} from "@/components/providers/socket-provider";


const OpenSans = Open_Sans({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Discord',
    description: 'This is a discord clone',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body className={cn(OpenSans.className,
                "bg-white dark:bg-gray-800"
            )}>
            <ThemeProvider
                attribute={"class"}
                defaultTheme={"dark"}
                storageKey={"discord-theme"}
                enableSystem={true}
            >
                <SocketProvider>
                    <ModalProviders/>
                    {children}
                </SocketProvider>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    )
}

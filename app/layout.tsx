import type {Metadata} from 'next'
import {Open_Sans} from 'next/font/google'
import './globals.css'
import {ClerkProvider} from '@clerk/nextjs'


const OpenSans = Open_Sans({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Discord',
    description: 'This is a discord clone',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={OpenSans.className}>{children}</body>
            </html>
        </ClerkProvider>
    )
}

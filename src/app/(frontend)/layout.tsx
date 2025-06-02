import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Yellowtail } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import './globals.css'

const yellowtail = Yellowtail({
  subsets: ['latin'],
  weight: ["400"],
  variable: "--font-yellowtail",
  display: "swap"
})

const quatro = localFont({
  src: [
    {
      path: '../../fonts/Quatro.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: "--font-quatro",
  display: "swap"
})

const quatroSlab = localFont({
  src: [
    {
      path: '../../fonts/QuatroSlab.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: "--font-quatro-slab",
  display: "swap"
})

export default async function RootLayout({ children }: { children: React.ReactNode, params: any }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable, quatro.variable, quatroSlab.variable, yellowtail.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />
          {children}
      </body>
    {/*<GoogleAnalytics gaId="G-7KBVJ8N50K"/>*/}
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

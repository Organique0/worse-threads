import '../globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs"
import TopBar from '@/components/shared/TobBar'
import BottomBar from '@/components/shared/BottomBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Worse-Threads-root",
  description: "Next.js Threads Clone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TopBar />
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider >
  )
}

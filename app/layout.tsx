import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import './globals.css'
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { Toaster } from "@/components/ui/toaster"

// 폰트 정의 추가
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'v0 App',  // 기존 제목 유지
  description: 'Created with v0',  // 기존 설명 유지
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">  {/* 한국어로 변경 */}
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <main className="flex-1 pb-16 max-w-md mx-auto w-full">{children}</main>
        <BottomNavigation />  {/* 하단 내비게이션 추가 */}
        <Toaster />  {/* 토스터 컴포넌트 추가 */}
      </body>
    </html>
  )
}

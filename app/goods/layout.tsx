"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function GoodsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<string>(
    pathname.includes("/auction") ? "auction" : pathname.includes("/photopackage") ? "photopackage" : "main",
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-4 text-center border-b border-gray-800">
        <h1 className="text-3xl font-bold text-red-500">굿즈</h1>
      </header>

      <div className="flex border-b border-gray-800">
        <Link
          href="/goods/auction"
          className={`flex-1 py-3 text-center ${activeTab === "auction" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}
          onClick={() => setActiveTab("auction")}
        >
          경매
        </Link>
        <Link
          href="/goods/photopackage"
          className={`flex-1 py-3 text-center ${activeTab === "photopackage" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400"}`}
          onClick={() => setActiveTab("photopackage")}
        >
          포카패키지
        </Link>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  )
}

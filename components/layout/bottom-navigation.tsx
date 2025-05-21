"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, Grid3X3, ShoppingBag, User } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/" className="flex-1 py-3 flex flex-col items-center">
          <Home size={20} className={isActive("/") && !isActive("/goods") ? "text-red-500" : "text-gray-400"} />
          <span className={`text-xs mt-1 ${isActive("/") && !isActive("/goods") ? "text-red-500" : "text-gray-400"}`}>
            홈
          </span>
        </Link>
        <Link href="/favorites" className="flex-1 py-3 flex flex-col items-center">
          <Heart size={20} className={isActive("/favorites") ? "text-red-500" : "text-gray-400"} />
          <span className={`text-xs mt-1 ${isActive("/favorites") ? "text-red-500" : "text-gray-400"}`}>투표</span>
        </Link>
        <Link href="/goods" className="flex-1 py-3 flex flex-col items-center">
          <Grid3X3 size={20} className={isActive("/goods") ? "text-red-500" : "text-gray-400"} />
          <span className={`text-xs mt-1 ${isActive("/goods") ? "text-red-500" : "text-gray-400"}`}>굿즈</span>
        </Link>
        <Link href="/orders" className="flex-1 py-3 flex flex-col items-center">
          <ShoppingBag size={20} className={isActive("/orders") ? "text-red-500" : "text-gray-400"} />
          <span className={`text-xs mt-1 ${isActive("/orders") ? "text-red-500" : "text-gray-400"}`}>주문</span>
        </Link>
        <Link href="/mypage" className="flex-1 py-3 flex flex-col items-center">
          <User size={20} className={isActive("/mypage") ? "text-red-500" : "text-gray-400"} />
          <span className={`text-xs mt-1 ${isActive("/mypage") ? "text-red-500" : "text-gray-400"}`}>마이</span>
        </Link>
      </div>
    </div>
  )
}

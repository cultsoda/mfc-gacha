"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AuctionCountdown } from "@/components/auction/auction-countdown"
import { MyAuctionStatus } from "@/components/auction/my-auction-status"
import { AuctionDashboard } from "@/components/auction/auction-dashboard"
import { getAuctionProducts } from "@/lib/auction"
import { RefreshCw } from "lucide-react"

export default function AuctionPage() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const data = await getAuctionProducts()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="pb-6">
      <div className="p-4 bg-gray-900">
        <h2 className="text-xl font-bold mb-2">경매 안내</h2>
        <p className="text-sm text-gray-300 mb-4">
          특별한 인플루언서 굿즈를 경매를 통해 만나보세요. 경매 수익금의 일부는 자선단체에 기부됩니다.
        </p>

        <div className="bg-black rounded-lg p-3 mb-4 flex justify-between items-center">
          <span className="text-sm">경매 종료까지</span>
          <span className="text-red-500 font-bold">
            <AuctionCountdown endTime="2025-06-30T23:59:59" />
          </span>
        </div>

        <h2 className="text-lg font-bold mb-2">경매 현황 대시보드</h2>
        <AuctionDashboard />

        <div className="mt-4">
          <MyAuctionStatus />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">경매 상품</h2>
          <button
            onClick={fetchProducts}
            className="flex items-center text-sm text-gray-400 hover:text-white"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={`mr-1 ${isLoading ? "animate-spin" : ""}`} />
            새로고침
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link href={`/goods/auction/${product.id}`} key={product.id} className="block">
              <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden mb-2">
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <h3 className="font-bold text-white">{product.name}</h3>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">현재 입찰가</span>
                <span className="font-bold text-white">{product.currentBid.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-400">입찰 수</span>
                <span className="text-red-500">{product.bidCount || 0}명</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 mt-4 bg-gray-900">
        <h2 className="text-lg font-bold mb-3">경매 유의사항</h2>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• 경매는 지정된 마감 시간까지 진행되며, 최고 입찰자에게 낙찰됩니다.</li>
          <li>• 최소 입찰 단위는 10,000원이며, 현재 최고 입찰가보다 높게 입찰해야 합니다.</li>
          <li>• 낙찰 시 즉시 결제가 진행되며, 결제 실패 시 차순위 입찰자에게 낙찰됩니다.</li>
          <li>• 낙찰 후 취소는 제한적으로만 가능하며, 환불 규정을 확인해주세요.</li>
          <li>• 경매 상품은 실제 촬영된 사진과 다를 수 있으며, 이로 인한 교환/환불은 불가합니다.</li>
        </ul>
      </div>
    </div>
  )
}

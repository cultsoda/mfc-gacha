"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BidHistory } from "@/components/auction/bid-history"
import { BidButton } from "@/components/auction/bid-button"
import { AuctionCountdown } from "@/components/auction/auction-countdown"
import { getAuctionProduct } from "@/lib/auction"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AuctionProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAuctionProduct(params.id)
        if (!data) {
          router.push("/goods/auction")
          return
        }
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="pb-6">
      <div className="bg-black py-3 px-4 flex items-center">
        <Link href="/goods/auction" className="mr-2">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">인플루언서의 경매 상품</h1>
      </div>

      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-4 bg-black">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
            <AuctionCountdown endTime={product.endTime} />
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-4">{product.shortDescription}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">현재 최고 입찰가</span>
          <span className="text-xl font-bold">{product.currentBid.toLocaleString()}원</span>
        </div>

        <BidButton productId={product.id} currentBid={product.currentBid} />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-3">입찰 내역</h2>
        <BidHistory bids={product.bids} autoRoll={true} />
      </div>

      <div className="grid grid-cols-4 gap-2 p-4">
        {product.additionalImages?.map((img: string, i: number) => (
          <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={img || "/placeholder.svg?height=200&width=200"}
              alt={`${product.name} 이미지 ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-900">
        <h2 className="text-lg font-bold mb-3">상품 설명</h2>
        <p className="text-sm text-gray-300 mb-4">{product.description}</p>

        <h3 className="font-bold mb-2">경품 상품 소개</h3>
        <p className="text-sm text-gray-300 mb-4">
          이 경매에 참여하시는 모든 분들께는 추첨을 통해 공기청정기를 드립니다. 최신형 공기청정기로, 미세먼지와
          유해물질을 99.9% 제거하는 고성능 제품입니다.
        </p>

        <h3 className="font-bold mb-2">경매 참여 안내</h3>
        <p className="text-sm text-gray-300">
          경매에 참여하시면 특별한 인플루언서 굿즈를 소장할 수 있는 기회를 얻게 됩니다. 또한 경매 수익금의 일부는
          자선단체에 기부되어 의미 있는 일에 쓰입니다.
        </p>
      </div>
    </div>
  )
}

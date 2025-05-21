"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { getAuctionProduct, getUserInfo, placeBid } from "@/lib/auction"

export default function BidPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const currentBid = Number.parseInt(searchParams.get("current") || "0")
  const hasExistingBid = searchParams.get("existing") === "true"

  const [product, setProduct] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState((currentBid + 10000).toString())
  const [paymentMethod, setPaymentMethod] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 상품 정보 가져오기
        const productData = await getAuctionProduct(params.id)
        if (!productData) {
          router.push("/goods/auction")
          return
        }
        setProduct(productData)

        // 사용자 정보 가져오기
        const userInfo = await getUserInfo()
        if (userInfo) {
          setName(userInfo.name || "")
          setPhone(userInfo.phone || "")
          setAddress(userInfo.address || "")
          setPaymentMethod(userInfo.paymentMethod || "card")
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          title: "데이터 로드 실패",
          description: "필요한 정보를 불러오는데 실패했습니다.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingProduct(false)
      }
    }

    fetchData()
  }, [params.id, router, toast])

  const handleSubmit = async () => {
    if (!agreed) {
      toast({
        title: "약관 동의 필요",
        description: "경매 약관에 동의해주세요.",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        title: "결제 수단 선택 필요",
        description: "결제 수단을 선택해주세요.",
        variant: "destructive",
      })
      return
    }

    if (!name || !phone || !address) {
      toast({
        title: "배송 정보 필요",
        description: "이름, 연락처, 주소를 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    const bidAmountNum = Number.parseInt(bidAmount)
    if (isNaN(bidAmountNum) || bidAmountNum <= currentBid) {
      toast({
        title: "유효하지 않은 입찰가",
        description: `현재 최고 입찰가(${currentBid.toLocaleString()}원)보다 높은 금액을 입력해주세요.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await placeBid({
        productId: params.id,
        amount: bidAmountNum,
        paymentMethod,
        name,
        phone,
        address,
      })

      toast({
        title: "입찰이 완료되었어요.",
        description: `${bidAmountNum.toLocaleString()}원에 성공적으로 입찰했습니다.`,
      })

      // 상세 페이지로 돌아가기
      router.push(`/goods/auction/${params.id}`)
    } catch (error) {
      toast({
        title: "입찰 실패",
        description: "입찰 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingProduct) {
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
        <Link href={`/goods/auction/${params.id}`} className="mr-2">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">{hasExistingBid ? "추가 입찰하기" : "입찰하기"}</h1>
      </div>

      <div className="grid gap-4 p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-300 mb-1">
            이 상품의 현재 최고 입찰가는 <span className="font-bold">{currentBid.toLocaleString()}원</span>입니다.
          </p>
          <p className="text-xs text-gray-400">최소 입찰 단위는 10,000원입니다.</p>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="bid-amount" className="text-sm">
            입찰가
          </Label>
          <Input
            id="bid-amount"
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            min={currentBid + 10000}
            max={2000000}
            step={10000}
            className="bg-gray-800 border-gray-700 text-white"
          />
          <p className="text-xs text-gray-400">
            입찰 가능 범위: {(currentBid + 10000).toLocaleString()}원 ~ 2,000,000원
          </p>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="payment-method" className="text-sm">
            결제 수단
          </Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger id="payment-method" className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="결제 수단 선택" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="card">신용카드</SelectItem>
              <SelectItem value="bank">계좌이체</SelectItem>
              <SelectItem value="phone">휴대폰 결제</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="name" className="text-sm">
            이름
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="phone" className="text-sm">
            휴대폰 번호
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="address" className="text-sm">
            주소
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="mt-1">
          <p className="text-xs text-gray-400 mb-2">
            입력한 정보는 계정 관리에 저장됩니다. 사용 중인 주소가 없을 경우 입력한 주소가 계정 관리에 저장되며, 사용
            중인 주소가 있을 경우 기존 사용 중인 주소가 유지됩니다.
          </p>
        </div>

        <div className="flex items-start space-x-2 mt-1">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 mt-1"
          />
          <Label htmlFor="terms" className="text-xs font-normal">
            경매 약관에 동의합니다. 낙찰 시 즉시 결제가 진행되며, 취소는 제한적으로만 가능합니다.
          </Label>
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading || !agreed}
          className={`bg-red-500 hover:bg-red-600 mt-4 ${!agreed ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "처리 중..." : "입찰하기"}
        </Button>
      </div>
    </div>
  )
}

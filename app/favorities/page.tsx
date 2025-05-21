"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { RefreshCw } from "lucide-react"

export default function FavoritesPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 1,
    minutes: 15,
    seconds: 9,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds }

        const newMinutes = prev.minutes - 1
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 }

        const newHours = prev.hours - 1
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 }

        const newDays = prev.days - 1
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 }

        clearInterval(timer)
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-pink-50 min-h-screen pb-16">
      <div className="bg-pink-100 p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">환승모델</h1>
        <p className="text-sm text-gray-600 mb-4">
          1라운드 팬 투표 시작
          <br />
          오직 15명만 2라운드에 진출합니다!
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white rounded-lg p-3 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 rounded-full p-2">
                <span className="text-green-600 text-xs">VS</span>
              </div>
              <span className="text-sm">강력한 배틀 투표</span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-100 rounded-full p-2">
                <span className="text-yellow-600 text-xs">👑</span>
              </div>
              <span className="text-sm">TOP15 진출 투표</span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 rounded-full p-2">
                <span className="text-purple-600 text-xs">🎁</span>
              </div>
              <span className="text-sm">투표한 모델 변경</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="flex justify-center space-x-2 mb-2">
            <button className="bg-red-500 text-white rounded-full px-4 py-1 text-sm">1 라운드</button>
            <button className="bg-gray-300 text-gray-600 rounded-full px-4 py-1 text-sm">2 라운드</button>
            <button className="bg-gray-300 text-gray-600 rounded-full px-4 py-1 text-sm">3 라운드</button>
            <button className="bg-gray-300 text-gray-600 rounded-full px-4 py-1 text-sm">4 라운드</button>
          </div>

          <div className="flex justify-center space-x-2 text-center">
            <div className="bg-white rounded-lg p-2 w-12">
              <div className="text-xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</div>
              <div className="text-xs text-gray-500">일</div>
            </div>
            <div className="bg-white rounded-lg p-2 w-12">
              <div className="text-xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
              <div className="text-xs text-gray-500">시간</div>
            </div>
            <div className="bg-white rounded-lg p-2 w-12">
              <div className="text-xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
              <div className="text-xs text-gray-500">분</div>
            </div>
            <div className="bg-white rounded-lg p-2 w-12">
              <div className="text-xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
              <div className="text-xs text-gray-500">초</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <button className="bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium">투표하기</button>
          <button className="bg-gray-200 border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium">
            참여하기
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-bold">일일투표</div>
            <button className="flex items-center text-xs text-gray-500">
              <RefreshCw size={12} className="mr-1" />
              새로고침
            </button>
          </div>

          <div className="flex justify-between mb-4">
            <div className="bg-purple-200 rounded-lg p-3 w-[48%] text-center">
              <div className="text-lg font-bold">Model A</div>
              <div className="text-xl font-bold text-purple-700">2,222</div>
            </div>
            <div className="flex items-center">
              <div className="bg-black text-white rounded-full px-2 py-1 text-xs">VS</div>
            </div>
            <div className="bg-yellow-200 rounded-lg p-3 w-[48%] text-center">
              <div className="text-lg font-bold">Model B</div>
              <div className="text-xl font-bold text-yellow-700">1,820</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">개인투표</div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="relative">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=225`}
                      alt={`모델 ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
                      {i.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-1">
                    <div className="text-xs font-medium">환승모델</div>
                    <div className="text-xs text-red-500 font-bold">18,642</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="text-sm font-bold text-left mb-2">유의사항</h3>
          <ul className="text-xs text-gray-600 text-left space-y-1">
            <li>• 투표는 하루에 한 번, 한 명에게만 가능합니다.</li>
            <li>• 투표한 모델은 매일 자정에 초기화됩니다.</li>
            <li>• 지지한 모델이 탈락하면 다른 모델에게 투표할 수 있습니다.</li>
            <li>• 부정 투표 시 제재를 받을 수 있습니다.</li>
            <li>• 투표 결과는 실시간으로 반영됩니다.</li>
            <li>• 모든 투표는 익명으로 처리됩니다.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

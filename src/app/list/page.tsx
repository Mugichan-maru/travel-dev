// app/list/page.tsx
"use client";

import Link from "next/link";
import { Calendar, Clock, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FormData } from "../types/form";

// TravelInfoコンポーネントを分離
function TravelInfo({ travelInfo }: { travelInfo: FormData }) {
  return (
    <>
      {/* 旅行基本情報 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-1 text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-xs">出発日</span>
          </div>
          <div className="font-medium">{travelInfo.startDate}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center mb-1 text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-xs">宿泊日数</span>
          </div>
          <div className="font-medium">{travelInfo.stayNights}</div>
        </div>
      </div>

      {/* 集合・解散時間 */}
      <div className="flex mb-4">
        <div className="bg-white rounded-full py-2 px-6 flex items-center flex-grow shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm mr-2">
              集合:
              {/* <Input value={travelInfo.departureTime} /> */}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm">解散: {travelInfo.disbandTime}</span>
          </div>
        </div>
        <button className="bg-white rounded-full p-2 ml-2 shadow-sm border border-gray-100">
          <Users className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </>
  );
}

function TravelContents({ travelInfo }: { travelInfo: FormData }) {
  const date = new Date(travelInfo.startDate);
  date.setDate(date.getDate() + Number(travelInfo.stayNights));

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formatted = `${year}-${month}-${day}`;
  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
        <div className="font-medium">{travelInfo.startDate}</div>
        <div className="font-medium">{travelInfo.departureTime}</div>
        <div className="h-24 flex items-center justify-center">
          <button className="text-gray-400">
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
        <div className="font-medium">{formatted}</div>
        <div className="font-medium">{travelInfo.disbandTime}</div>
        <div className="h-24 flex items-center justify-center">
          <button className="text-gray-400">
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TravelItinerary() {
  const params = useSearchParams();

  // URLパラメータから値を取得
  const travelInfo = {
    startDate: params.get("startDate") || "未設定",
    stayNights: params.get("stayNights") || "未設定",
    departureTime: params.get("departureTime") || "未設定",
    disbandTime: params.get("disbandTime") || "未設定",
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 flex flex-col">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-1 bg-gray-300 flex-grow mr-2"></div>
        <div className="h-1 bg-gray-200 w-16"></div>
      </div>

      {/* SuspenseでTravelInfoをラップ */}
      <Suspense fallback={<div>Loading...</div>}>
        <TravelInfo travelInfo={travelInfo} />

        {/* コンテンツエリア - 3つのカード */}
        {[1].map((item) => (
          <TravelContents key={item} travelInfo={travelInfo} />
        ))}
      </Suspense>

      {/* 戻るボタン */}
      <Link href="/form" className="block">
        <button className="bg-black w-full text-white rounded-full py-3 px-6 mx-auto mb-4">
          戻る
        </button>
      </Link>

      {/* ナビゲーションアイコン */}
      {/* <div className="flex justify-center">
        <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
          <span className="font-semibold">N</span>
        </div>
      </div> */}
    </div>
  );
}

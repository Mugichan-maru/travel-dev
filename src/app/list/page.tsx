// app/list/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { FormData } from "../types/form";

function TravelInfo({ travelInfo }: { travelInfo: FormData }) {
  return (
    <div>
      {/* 旅行基本情報 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="font-medium">{travelInfo.startDate}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="font-medium">{travelInfo.stayNights}</div>
        </div>
      </div>
    </div>
  );
}

function TravelContents({ travelInfo }: { travelInfo: FormData }) {
  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
        <div className="font-medium">{travelInfo.startDate}</div>
      </div>
    </div>
  );
}

function TravelScheduleContent() {
  const params = useSearchParams();

  // URLパラメータから値を取得
  const travelInfo = {
    startDate: params.get("startDate") || "未設定",
    stayNights: params.get("stayNights") || "未設定",
    departureTime: params.get("departureTime") || "未設定",
    disbandTime: params.get("disbandTime") || "未設定",
  };

  return (
    <>
      <TravelInfo travelInfo={travelInfo} />
      {[1].map((item) => (
        <TravelContents key={item} travelInfo={travelInfo} />
      ))}
    </>
  );
}

export default function TravelItinerary() {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 flex flex-col">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-1 bg-gray-300 flex-grow mr-2"></div>
        <div className="h-1 bg-gray-200 w-16"></div>
      </div>

      {/* SuspenseでTravelScheduleContentをラップ */}
      <Suspense fallback={<div>Loading...</div>}>
        <TravelScheduleContent />
      </Suspense>

      {/* 戻るボタン */}
      <Link href="/form" className="block">
        <button className="bg-black w-full text-white rounded-full py-3 px-6 mx-auto mb-4">
          戻る
        </button>
      </Link>
    </div>
  );
}

// app/list/page.tsx
"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  Edit,
  Info,
  MapPin,
  Plus,
  Users,
  Wallet,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Suspense, useState } from "react";
import { FormData, TravelItem } from "../types/form";
import AddTravelModal from "@/components/add-travel-modal";
import EditTravelModal from "@/components/edit-travel-modal";

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
              集合:{travelInfo.departureTime}
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

function TravelContents({ item }: { item: TravelItem }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  console.log("item:", item);

  const [travelItems, setTravelItems] = useState<TravelItem[]>([]);
  // 編集した予定を追加する関数
  const handleEditTravel = (newItem: TravelItem) => {
    setTravelItems((prev) => [
      ...prev,
      { ...newItem, id: Date.now(), isCompleted: false },
    ]);
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100 relative">
        <div
          className="absolute top-4 right-4"
          onClick={() => setIsEditModalOpen(true)}
        >
          <button className="text-gray-400 hover:text-gray-600">
            <Edit className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center mb-3">
          <div className="bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center mr-3">
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <div className="text-sm font-medium">{item.formattedDate}</div>
            <div className="text-xs text-gray-500">{item.time}</div>
          </div>
        </div>

        <div className="mb-3 ml-0">
          <h3 className="font-medium mb-1">{item.title}</h3>

          <div className="flex items-start text-xs text-gray-500 mb-1">
            <MapPin className="w-3 h-3 mr-1 mt-0.5" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-start text-xs text-gray-500 mb-1">
            <Wallet className="w-3 h-3 mr-1 mt-0.5" />
            <span>{item.cost}</span>
          </div>

          {item.notes && (
            <div className="flex items-start text-xs text-gray-500">
              <Info className="w-3 h-3 mr-1 mt-0.5" />
              <span>{item.notes}</span>
            </div>
          )}
        </div>
      </div>

      <EditTravelModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditTravel}
        travelInfo={item}
      />
    </>
  );
}

function TravelScheduleContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const params = useSearchParams();

  const travelInfo = {
    startDate: params.get("startDate") || "未設定",
    stayNights: params.get("stayNights") || "未設定",
    departureTime: params.get("departureTime") || "未設定",
    disbandTime: params.get("disbandTime") || "未設定",
  };

  // 日付を「月日（曜日）」形式に変換
  const dateObj = new Date(travelInfo.startDate);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[dateObj.getDay()];
  const formattedDate = `${month}月${day}日（${weekday}）`;

  // テストデータ
  const [travelItems, setTravelItems] = useState<TravelItem[]>([
    {
      id: 1,
      date: travelInfo.startDate,
      formattedDate: formattedDate,
      time: "09:30 - 12:00",
      startTime: "09:30",
      endTime: "12:00",
      title: "新大阪駅集合・新幹線で博多駅へ",
      location: "新大阪駅",
      cost: "14,750円",
      notes: "JR山陽新幹線のぞみ41号、指定席8号車",
      isCompleted: false,
    },
    {
      id: 2,
      date: travelInfo.startDate,
      formattedDate: formattedDate,
      time: "13:00 - 14:00",
      startTime: "13:00",
      endTime: "14:00",
      title: "博多ラーメン",
      location: "博多駅周辺",
      cost: "1000円",
      notes: "ラーメン屋さんは未定",
      isCompleted: false,
    },
  ]);

  // 新しい予定を追加する関数
  const handleAddTravel = (newItem: TravelItem) => {
    setTravelItems((prev) => [
      ...prev,
      { ...newItem, id: Date.now(), isCompleted: false },
    ]);
  };

  return (
    <>
      <TravelInfo travelInfo={travelInfo} />
      {travelItems.map((item) => (
        <TravelContents key={item.id} item={item} />
      ))}

      {/* 新規追加用のカード */}
      <div
        className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsAddModalOpen(true)}
      >
        <div className="h-32 flex flex-col items-center justify-center">
          <button className="bg-gray-100 rounded-full p-3 text-gray-400 hover:bg-gray-200 mb-2">
            <Plus className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-400">新しい予定を追加</span>
        </div>
      </div>

      {/* 予定追加モーダル */}
      <AddTravelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTravel}
      />
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

      {/* SuspenseでTravelInfoをラップ */}
      <Suspense fallback={<div>Loading...</div>}>
        <TravelScheduleContent />
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

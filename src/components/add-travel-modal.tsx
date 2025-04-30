"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, Clock, MapPin, Wallet, Info, X } from "lucide-react";
import { TravelItem, AddTravelModalProps } from "@/app/types/form";

export default function AddTravelModal({
  isOpen,
  onClose,
  onSave,
}: AddTravelModalProps) {
  const initialFormState = {
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    location: "",
    cost: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 日付を「月日（曜日）」形式に変換
    const dateObj = new Date(formData.date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[dateObj.getDay()];
    const formattedDate = `${month}月${day}日（${weekday}）`;

    // 時間を「開始 - 終了」形式に変換
    const formattedTime = `${formData.startTime} - ${formData.endTime}`;

    const newTravelItem: TravelItem = {
      ...formData,
      id: Date.now(),
      date: formattedDate,
      time: formattedTime,
      isCompleted: false, // 新しい予定は未完了
    };

    onSave(newTravelItem);
    setFormData(initialFormState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">予定を追加</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="date"
                className="text-sm font-medium mb-1 flex items-center"
              >
                <Calendar className="w-4 h-4 mr-1" />
                日付
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="startTime"
                  className="text-sm font-medium mb-1 flex items-center"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  開始時間
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="text-sm font-medium mb-1 flex items-center"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  終了時間
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                予定タイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                placeholder="例: 清水寺観光"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="text-sm font-medium mb-1 flex items-center"
              >
                <MapPin className="w-4 h-4 mr-1" />
                場所
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                placeholder="例: 京都市東山区"
              />
            </div>

            <div>
              <label
                htmlFor="cost"
                className="text-sm font-medium mb-1 flex items-center"
              >
                <Wallet className="w-4 h-4 mr-1" />
                費用
              </label>
              <input
                type="text"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                placeholder="例: 400円"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="text-sm font-medium mb-1 flex items-center"
              >
                <Info className="w-4 h-4 mr-1" />
                メモ
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                rows={3}
                placeholder="例: 拝観料が必要です"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

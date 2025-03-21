// app/form/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bird } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  startDate: string;
  duration: string;
  departureTime: string;
  disbandTime: string;
}

type FormErrors = {
  startDate?: string;
  duration?: string;
  departureTime?: string;
  disbandTime?: string;
}

export default function FormPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    startDate: "",
    duration: "",
    departureTime: "",
    disbandTime: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState<string|null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
  
    setFormData({
      ...formData,
      [name]: value
    });
  
    if(errors) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };
  
  const validateForm = ():boolean => {
    const newErrors:FormErrors = {};
  
    // 開始日のバリデーション
    if (!formData.startDate) {
      newErrors.startDate = "開始日は必須項目です";
    } else if (!/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(formData.startDate)) {
      newErrors.startDate = "正しい日付形式で入力してください（例: 2025-03-21）";
    }
  
    // 宿泊日数のバリデーション
    if (!formData.duration) {
      newErrors.duration = "宿泊日数は必須項目です";
    } else if (!/^[1-9]\d*泊[1-9]\d*日$/.test(formData.duration)) {
      newErrors.duration = "「○泊○日」の形式で入力してください（例: 2泊3日）";
    }
  
     // 出発時間のバリデーション
    if (!formData.departureTime) {
      newErrors.departureTime = "出発時間は必須項目です";
    } else if (!/^([0-1]?[0-9]|2[0-3])時(頃|ごろ)?$/.test(formData.departureTime)) {
      newErrors.departureTime = "「○時頃」の形式で入力してください（例: 9時頃）";
    }
  
    // 解散時間のバリデーション
    if (!formData.disbandTime) {
      newErrors.disbandTime = "解散時間は必須項目です";
    } else if (!/^([0-1]?[0-9]|2[0-3])時(頃|ごろ)?$/.test(formData.disbandTime)) {
      newErrors.disbandTime = "「○時頃」の形式で入力してください（例: 17時頃）";
    }
  
    setErrors(newErrors);
  
    // エラーがなければtrue、あればfalseを返す
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    
    if(validateForm()){
      try{
        localStorage.setItem("travelSchedule", JSON.stringify(formData));
        router.push("/list");
      } catch (error){
        setSubmissionError("データの保存中にエラーが発生しました。")
      }
    } else {
      window.scrollTo(0, 0);
    } 
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col p-6 bg-gray-100 rounded-3xl">
      {/* モバイルフレーム */}
      <div className="flex-1 flex flex-col justify-around">
        {/* アイコン */}
        <div className="flex justify-center mb-8 mt-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <Bird className="text-white" size={24} />
          </div>
        </div>

        {/* エラーアラート */}
        {submissionError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {submissionError}
            <button 
              onClick={() => setSubmissionError(null)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 開始日フィールド */}
          <div>
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-2 block">
              1.いつから（年月日）
            </label>
            <Input 
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="例: 2025-03-21"
              className={`h-12 bg-white border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
            {errors.startDate && (
              <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
            )}
          </div>
          
          {/* 宿泊日数フィールド */}
          <div>
            <label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">
              2.何泊（〇泊〇日）
            </label>
            <Input 
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="例: 2泊3日"
              className={`h-12 bg-white border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
            {errors.duration && (
              <p className="mt-1 text-xs text-red-600">{errors.duration}</p>
            )}
          </div>
          
          {/* 出発時間フィールド */}
          <div>
            <label htmlFor="departureTime" className="text-sm font-medium text-gray-700 mb-2 block">
              3.何時から出発（〇時頃）
            </label>
            <Input 
              id="departureTime"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              placeholder="例: 9時頃"
              className={`h-12 bg-white border ${errors.departureTime ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
            {errors.departureTime && (
              <p className="mt-1 text-xs text-red-600">{errors.departureTime}</p>
            )}
          </div>
          
          {/* 解散時間フィールド */}
          <div>
            <label htmlFor="disbandTime" className="text-sm font-medium text-gray-700 mb-2 block">
              4.何時に解散（△時頃）
            </label>
            <Input 
              id="disbandTime"
              name="disbandTime"
              value={formData.disbandTime}
              onChange={handleChange}
              placeholder="例: 17時頃"
              className={`h-12 bg-white border ${errors.disbandTime ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
            {errors.disbandTime && (
              <p className="mt-1 text-xs text-red-600">{errors.disbandTime}</p>
            )}
          </div>

          {/* 次へボタン */}
          <Button 
            type="submit" 
            className="w-full h-14 bg-black text-white rounded-full mt-8 mb-4"
          >
            次へ
          </Button>
        </form>
      </div>
    </div>
  );
}
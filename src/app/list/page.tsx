// app/list/page.tsx
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from 'lucide-react';

export default function ListPage() {
    return (
        <div className="max-w-md mx-auto h-screen flex flex-col p-6 bg-gray-100 rounded-3xl">
        {/* リスト画面 */}
            <div className="flex-1 flex flex-col">
                {/* 青枠で囲まれたコンテンツエリア */}
                {/* 上部の検索バー */}
                <div className="flex items-center mb-4">
                    <div className="h-0.5 w-3/4 bg-gray-400"></div>
                    <div className="h-0.5 w-1/4 bg-gray-300 ml-2 border-l border-dotted border-blue-400"></div>
                </div>
                
                {/* 2つのカード */}
                <div className="flex space-x-3 mb-6">
                    <div className="w-1/2 h-24 rounded-xl border border-gray-800"></div>
                    <div className="w-1/2 h-24 rounded-xl border border-gray-800"></div>
                </div>
                
                {/* 検索バー */}
                <div className="flex items-center mb-6">
                    <div className="flex-1 h-10 rounded-full border border-gray-800"></div>
                    <div className="w-10 h-10 rounded-full border border-gray-800 ml-2"></div>
                </div>
                
                {/* カードリスト */}
                {[1, 2, 3].map((item) => (
                    <Card key={item} className="mb-4 p-3 rounded-xl flex items-center">
                    <div className="rounded-lg bg-gray-200 w-12 h-12"></div>
                    <div className="ml-3 flex-1">
                        <div className="h-0.5 w-3/4 bg-gray-400"></div>
                        <div className="h-0.5 w-1/2 bg-gray-300 mt-2"></div>
                    </div>
                    <Plus size={20} />
                    </Card>
                ))}
                <Link href="/form" className="block">
                    {/* <ArrowBigLeft /> */}
                    <Button className="w-1/2 bg-black text-white rounded-full">
                        戻る
                    </Button>
                </Link>
            </div>
            
            {/* ナビゲーションドット */}
            {/*
            <div className="flex justify-center space-x-4 mt-auto">
            {[1, 2, 3, 4, 5].map((dot, i) => (
                <div 
                key={dot} 
                className={`w-5 h-5 rounded-full border border-gray-800 ${i === 3 ? 'bg-black' : 'bg-white'}`}
                ></div>
            ))}
            </div>
            */}
        </div>
    );
}
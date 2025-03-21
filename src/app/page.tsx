import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
return (
        <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">モバイルアプリのモックアップ</h1>
        
        <div className="space-y-4">
            <Link href="/form" className="block">
            <Button className="w-full">しおりを作成する</Button>
            </Link>
            
            <Link href="/list" className="block">
            <Button className="w-full">リスト画面を表示</Button>
            </Link>
        </div>
        </div>
    );
}
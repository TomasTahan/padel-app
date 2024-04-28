import { LayoutDashboard, Trophy } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="space-y-4 flex flex-col h-full text-primary border-r border-black/25">
      <div className="px-2 py-10">
        <p>Las Pircas</p>

        <div className="flex flex-col gap-10 mt-20 justify-center items-center">
          <Link href="/" className="group">
            <LayoutDashboard className="h-8 w-8 transition-all group-hover:scale-110" />
          </Link>
          <Link href="/torneos" className="group">
            <Trophy className="h-8 w-8 transition-all group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
}

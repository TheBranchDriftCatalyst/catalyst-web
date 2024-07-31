// "use client";
import { Card } from "@/catalyst-ui/ui/card";
import NQueensBoard from "./_components/Board";
import { BoardProvider } from "./_components/BoardContext";
import SolverStats from "./_components/SolverStats";


import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <BoardProvider>
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-2">
          <SolverStats />
        </Card>
        <div className="col-span-2">
          <NQueensBoard />
        </div>
      </div>
    </BoardProvider>
  );
}

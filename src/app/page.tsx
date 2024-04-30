"use client";
import NQueensBoard from '@/components/Board';
import { BoardProvider } from '@/components/BoardContext';
import SolverStats from '@/components/SolverStats';
import { TopBar } from '@/components/Topbar';
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <>
      <BoardProvider>
        <TopBar />
        <SolverStats />
        <NQueensBoard />
      </BoardProvider>
    </>
  );
}

"use client";
import { Board } from '@/components/Board';
import { BoardProvider } from '@/components/BoardContext';
import { TopBar } from '@/components/Topbar';
import { Stats } from 'fs';
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <>
      <BoardProvider>
        <TopBar />
        <Stats />
        <Board />
      </BoardProvider>
    </>
  );
}

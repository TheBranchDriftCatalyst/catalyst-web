"use client";
import { Board } from '@/components/Board';
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

"use client";
import Board from "@/components/Board";
// import NQueensSolver, { QueenCoordinates } from "@/old/lib/n_queens_solver";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";


import { TopBar } from "@/components/TopBar/TopBar";
import SimAnnealNQueensSolver, { QueenCoordinates } from "@/lib/annealing_solver";
import NQueensSolver from "@/lib/n_queens_solver";
import { reduce } from "lodash";

const inter = Inter({ subsets: ["latin"] });

type ArrayOfQueenPositions = QueenCoordinates[];
type SolverStats = { removed: number; placed: number; solved: number };

const INITIAL_REFRESH_TIME = 1;
const INITIAL_BOARD_SIZE = 6;

export default function Home() {
  const [boardState, setBoardState] = useState<ArrayOfQueenPositions>([]);
  const [boardSize, setBoardSize] = useState<number>(INITIAL_BOARD_SIZE);
  const [refreshTime, _setRefreshTime] = useState<number>(INITIAL_REFRESH_TIME);
  const [solver, setSolver] = useState<NQueensSolver | SimAnnealNQueensSolver>(
    new NQueensSolver(boardSize),
  );
  const [solutions, setBoardSolutions] = useState<ArrayOfQueenPositions[]>(
    solver.solutions,
  );
  const [stats, setStats] = useState<SolverStats>({
    removed: 0,
    placed: 0,
    solved: 0,
  });

  //  we want to pass this down to the board so that the cells can lookup if they are active in O(1) time
  const stateMap: Map<string, boolean> = reduce(
    boardState,
    (r, x): Map<string, boolean> => r.set(`${x[0]},${x[1]}`, true),
    new Map<string, boolean>(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextState = solver.moves.shift();
      nextState && setBoardState(nextState);
      const nextMoveType = solver.moveSequence.shift();
      if (nextMoveType) {
        stats[nextMoveType] += 1;
        setStats({ ...stats });
      }
    }, refreshTime);
    return () => clearInterval(interval);
  }, [solver, refreshTime]);

  return (
    <main>
      <TopBar />
      <Board size={boardSize} boardState={stateMap} />
    </main>
  );
}

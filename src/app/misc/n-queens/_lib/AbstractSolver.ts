import { QueenPoint } from "./BacktrackingSolver";

interface SolverStats {
  steps: number;
  removed: number;
  placed: number;
  // solutions: number
  solved: number;
}

// Interfaces define public contracts so no private stuff

export interface NQueensSolverInterface<T> {
  stats: SolverStats;
  solutions: QueenPoint[][];

  _bindOnMove: (cb: (state: QueenPoint[]) => void) => void;

  getSolutionBoards: () => string[];

  solve: (row?: number) => T;
}

export default NQueensSolverInterface;

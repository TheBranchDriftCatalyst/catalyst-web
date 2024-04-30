import { QueenCoordinates } from "./BacktrackingSolver";

interface SolverStats {
  steps: number,
  removed: number,
  placed: number,
  // solutions: number
  solved: number
}

// Interfaces define public contracts... so i am not adding any private methods here

export interface NQueensSolverInterface<T> {
  stats: SolverStats;
  solutions: QueenCoordinates[][];

  _bindOnMove: (cb: (state: QueenCoordinates[]) => void) => void;

  getSolutionBoards: () => string[]

  solve: (row?: number) => T;
}

export default NQueensSolverInterface

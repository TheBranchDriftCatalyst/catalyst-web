import Debug from "debug";
import { cloneDeep } from "lodash";
import NQueensSolverInterface from "./AbstractSolver";

const dbg = Debug("RecNQueens");

export type QueenPoint = [x: number, y: number];

interface SolverStats {
  steps: number;
  removed: number;
  placed: number;
  solved: number;
}

export default class BacktrackingSolver
  implements NQueensSolverInterface<BacktrackingSolver>
{
  // private board: BoardState;
  private queens: QueenPoint[] = [];

  isRunning = false;

  solutions: QueenPoint[][] = [];
  stats: SolverStats = {
    steps: 0,
    removed: 0,
    placed: 0,
    solved: 0,
  };
  private onMove: ((state: typeof this.queens) => void) | undefined;

  constructor(private readonly size: number) {
    this.size = size;
    // this.board = Array.from({ length: size }, () => Array(size).fill(0));
  }

  _bindOnMove: (cb: (state: QueenPoint[]) => void) => void = (cb) => {
    this.onMove = cb;
  };

  solve(row = 0): BacktrackingSolver {
    this.isRunning = true;
    if (this.size === 2 || this.size === 3) {
      return this; // No solution possible
    }
    if (row === this.size) {
      dbg("Solution found!");
      this.solutions.push(this.queens.map((queen) => [...queen]));
      this.stats.solved++;
      this.onMove && this.onMove(cloneDeep(this.queens));
      return this;
    }
    for (let col = 0; col < this.size; col++) {
      if (this.canPlaceQueen(row, col)) {
        this.placeQueen(row, col);
        this.solve(row + 1);
        this.removeQueen(row, col);
      }
    }
    this.isRunning = false;
    return this;
  }

  private canPlaceQueen(row: number, col: number): boolean {
    for (const [qRow, qCol] of this.queens) {
      if (
        col === qCol || // Same column
        qRow - qCol === row - col || // Same major diagonal
        qRow + qCol === row + col
      ) {
        // Same minor diagonal
        return false;
      }
    }
    return true;
  }

  private placeQueen(row: number, col: number): void {
    // this.board[row][col] = 1;
    this.queens.push([row, col]);
    this.stats.placed++;
    this.onMove && this.onMove(cloneDeep(this.queens));
  }

  private removeQueen(row: number, col: number): void {
    // this.board[row][col] = 0;
    this.queens = this.queens.filter(
      ([qRow, qCol]) => qRow !== row || qCol !== col,
    );
    this.stats.removed++;
    this.onMove && this.onMove(cloneDeep(this.queens));
  }

  getSolutionBoards(): string[] {
    return this.solutions.map((solution) => {
      const board = Array.from({ length: this.size }, () =>
        Array(this.size).fill("."),
      );
      solution.forEach(([x, y]) => (board[x][y] = "Q"));
      return board.map((row) => row.join(" ")).join("\n");
    });
  }
}

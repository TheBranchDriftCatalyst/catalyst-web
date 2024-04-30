import Debug from 'debug';
import { cloneDeep } from 'lodash';
import NQueensSolverInterface from './NQueensSolver';

const dbg = Debug('RecNQueens');

type Point = [x: number, y: number];

interface SolverStats {
  steps: number,
  removed: number,
  placed: number,
  solved: number
}

export type QueenCoordinates = Point

export default class BacktrackingSolver implements NQueensSolverInterface<BacktrackingSolver> {
  // private board: BoardState;
  private queens = [];

  solutions: QueenCoordinates[][] = [];
  stats: SolverStats = {
    steps: 0,
    removed: 0,
    placed: 0,
    solved: 0
  }
  private onMove: ((state: QueenCoordinates[]) => void) | undefined;

  constructor(private readonly size: number) {
    // this.board = Array.from({ length: size }, () => Array(size).fill(0));
  }

  _bindOnMove: (cb: (state: QueenCoordinates[]) => void) => void = (cb) => {
    this.onMove = cb;
  };

  solve(row = 0): BacktrackingSolver {
    if (this.size === 2 || this.size === 3) {
      return this; // No solution possible
    }
    if (row === this.size) {
      dbg('Solution found!');
      this.solutions.push(this.queens.map(queen => [...queen]));
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
    return this;
  }

  private canPlaceQueen(row: number, col: number): boolean {
    for (const [qRow, qCol] of this.queens) {
      if (col === qCol || // Same column
          qRow - qCol === row - col || // Same major diagonal
          qRow + qCol === row + col) { // Same minor diagonal
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
    this.queens = this.queens.filter(([qRow, qCol]) => qRow !== row || qCol !== col);
    this.stats.removed++;
    this.onMove && this.onMove(cloneDeep(this.queens));
  }

  getSolutionBoards(): string[] {
    return this.solutions.map(solution => {
      const board = Array.from({ length: this.size }, () => Array(this.size).fill('.'));
      solution.forEach(([x, y]) => board[x][y] = 'Q');
      return board.map(row => row.join(' ')).join('\n');
    });
  }
}

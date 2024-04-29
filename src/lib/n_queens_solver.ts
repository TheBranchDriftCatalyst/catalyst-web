import Debug from 'debug';

const dbg = Debug('RecNQueens');

interface SolverStats {
  steps: number,
  removed: number,
  placed: number,
  solved: number
}

export type QueenCoordinates = [number, number];

export default class NQueensSolver {
  private board: number[][];
  private queens: QueenCoordinates[] = [];

  solutions: QueenCoordinates[][] = [];
  boardStates: string[] = []; // Array to store the string representations of board states
  stats: SolverStats = {
    steps: 0,
    removed: 0,
    placed: 0,
    solved: 0
  }

  constructor(private readonly size: number) {
    this.board = Array.from({ length: size }, () => Array(size).fill(0));
  }

  solve(row = 0): NQueensSolver {
    if (this.size === 2 || this.size === 3) {
      return this; // No solution possible
    }
    if (row === this.size) {
      dbg('Solution found!');
      this.solutions.push(this.queens.map(queen => [...queen]));
      this.stats.solved++;
      this.boardStates.push(this.printBoard()); // Save final state for each solution
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
    this.board[row][col] = 1;
    this.queens.push([row, col]);
    this.stats.placed++;
    this.boardStates.push(this.printBoard()); // Save state after placing a queen
  }

  private removeQueen(row: number, col: number): void {
    this.board[row][col] = 0;
    this.queens = this.queens.filter(([qRow, qCol]) => qRow !== row || qCol !== col);
    this.stats.removed++;
    this.boardStates.push(this.printBoard()); // Save state after removing a queen
  }

  private printBoard(): string {
    return this.board.map(row => row.join(' ')).join('\n');
  }

  getSolutionBoards(): string[] {
    return this.solutions.map(solution => {
      const board = Array.from({ length: this.size }, () => Array(this.size).fill('.'));
      solution.forEach(([x, y]) => board[x][y] = 'Q');
      return board.map(row => row.join(' ')).join('\n');
    });
  }
}

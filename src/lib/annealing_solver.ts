import { cloneDeep, times, remove } from "lodash";
import Debug from "debug";

const dbg = Debug("SimAnnealNQueens");

interface SolverStats {
  steps: number;
  removed: number;
  placed: number;
  solved: number;
}

export type QueenCoordinates = [number, number];
type BoardState = number[][];

export default class SimAnnealNQueensSolver {
  board: number[][];
  queens: QueenCoordinates[] = [];
  solutions: QueenCoordinates[][] = [];
  moves: QueenCoordinates[][] = [];
  moveSequence: string[] = [];
  stats: SolverStats = {
    steps: 0,
    removed: 0,
    placed: 0,
    solved: 0,
  };

  constructor(n: number) {
    this.board = times(n, () => times(n, () => 0));
  }

  solve(): SimAnnealNQueensSolver {
    const boardStatesBucket = this.simulatedAnnealing(this.board.length);
    console.log(`boardStatesBucket: ${boardStatesBucket.length} states found in bucket`)
    this.solutions.push(boardStatesBucket[boardStatesBucket.length - 1]);
    return this;
  }

  simulatedAnnealing(
    n: number,
    maxSteps = 10000,
    startTemp = 1.0,
    alpha = 0.95
  ): QueenCoordinates[][][] {
    let current = this.randomAssignment(n);
    let currentCost = this.conflicts(current);
    let temp = startTemp;
    const boardStates: QueenCoordinates[][][] = [];

    for (let step = 0; step < maxSteps; step++) {
      boardStates.push(current.map((val, idx) => [idx, val]));
      
      if (currentCost === 0) {
        this.solutionFound(current);
        break;
      }

      const [i, j] = [this.randomInt(n), this.randomInt(n)];
      const successor = [...current];
      [successor[i], successor[j]] = [successor[j], successor[i]];
      const successorCost = this.conflicts(successor);

      const delta = successorCost - currentCost;
      if (delta < 0 || Math.random() < Math.exp(-delta / temp)) {
        current = successor;
        currentCost = successorCost;
      }

      temp *= alpha;
    }

    return boardStates;
  }

  solutionFound(solution: QueenCoordinates[]): void {
    const _solution = cloneDeep(solution);
    this.solutions.push(_solution);
    this.stats.solved++;
    this.moveSequence.push("solved");
  }

  randomAssignment(n: number): number[] {
    const assignment: number[] = [];
    for (let i = 0; i < n; i++) {
      assignment.push(this.randomInt(n));
    }
    return assignment;
  }

  conflicts(board: number[]): number {
    const n = board.length;
    let conflicts = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (board[i] === board[j] || Math.abs(board[i] - board[j]) === j - i) {
          conflicts++;
        }
      }
    }
    return conflicts;
  }

  randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}

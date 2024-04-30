import NQueensSolver from '@/lib/solvers/BacktrackingSolver';
import Debug from 'debug';
import { cloneDeep } from 'lodash';
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const debug = Debug('nqueens:board-context');
debug.enabled = true


export type SetOfQueenPositions = Set<string>;
export type SolverStats = { removed: number, placed: number, solved: number }

export type ReactStateUpdate<T> = [T, React.Dispatch<T>];

interface BoardContextShape {
  config: {
    refreshRate: ReactStateUpdate<number>;
    size: ReactStateUpdate<number>;
  },
  board: {
    state: SetOfQueenPositions;
    stats: SolverStats;
  },
  tracking: {
    scrubberPosition: ReactStateUpdate<number>;
    playing: ReactStateUpdate<boolean>;
  },
  solver: {
    instance: NQueensSolver;
    isRunning: boolean;
    start: () => boolean;
    bufferSize: number
  }
}

const INITIAL_REFRESH_TIME = 100;
const INITIAL_BOARD_SIZE = 4;

// Create the context
const BoardContext = createContext<BoardContextShape | undefined>(undefined);

// Define the provider component
interface BoardProviderProps {
  children: ReactNode;
  solver?: NQueensSolver;
}

const toast = {
  //  TODO: change this with useToast at some point
  error: (msg: string) => console.error(msg),
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ solver, children }: BoardProviderProps) => {

  // config
  const [boardSize, setBoardSize] = useState(INITIAL_BOARD_SIZE);
  const [boardRefreshRate, setRefreshRate] = useState(INITIAL_REFRESH_TIME);

  // replay control
  const [scrubberPosition, setScrubberPosition] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  // solver to react connectors
  const [solverInstance, setSolver] = useState<NQueensSolver>(solver || new NQueensSolver(boardSize));
  const [solverStats, setSolverStats] = useState<SolverStats>({ removed: 0, placed: 0, solved: 0 });
  const [solverIsRunning, _setSolverIsRunning] = useState<boolean>(false);
  // having these detached means its lagging but its desired
  // const solverBuffer: SetOfQueenPositions[] = [new Set()]
  const solverBuffer = useRef<SetOfQueenPositions[]>([new Set()]);
  const [solverBufferSize, setBufferSize] = useState<number>(0);

  const currentBoardState = solverBuffer.current[scrubberPosition]

  useEffect(() => {
    return solverInstance._bindOnMove(queens => {
      const moveLookup = new Set(queens.map(q => q.join(',')))
      solverBuffer.current.push(moveLookup);
    });
  }, [solverInstance]);

  const startSolver = useCallback(() => {
    if (solverIsRunning) {
      toast.error('Solver is already running');
      return false;
    }
    solverInstance.solve();
    _setSolverIsRunning(true);
    return true;
  }, [solverInstance, solverIsRunning]);

  const updateScrubberPositionAndPause = useCallback((position: number) => {
    setScrubberPosition(p => Math.min(p + 1, solverBufferSize));
    setPlaying(false);
  }, [setScrubberPosition, setPlaying, solverBufferSize]);

  // render loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!solverIsRunning) {
        return;
      }
      debug("interval", { scrubberPosition, solverBuffer })

      setSolverStats(cloneDeep(solverInstance.stats));
      if (scrubberPosition < solverBuffer.current.length) {
        setScrubberPosition(p => Math.min(p + 1, solverBufferSize));
      } else {
        setPlaying(false);
      }
      setBufferSize(solverBuffer.current.length)
    }, boardRefreshRate);
    return () => clearInterval(interval);
  }), [boardRefreshRate, solverInstance, solverIsRunning];


  return (
    <BoardContext.Provider value={{
      config: {
        refreshRate: [boardRefreshRate, setRefreshRate],
        size: [boardSize, setBoardSize],
      },
      board: {
        state: currentBoardState,
        stats: solverStats,
      },
      tracking: {
        scrubberPosition: [scrubberPosition, updateScrubberPositionAndPause],
        playing: [playing, setPlaying],
      },
      solver: {
        instance: solverInstance,
        isRunning: solverIsRunning,
        start: startSolver,
        bufferSize: solverBufferSize
      }
    }}>
      {children}
    </BoardContext.Provider>
  );
};

// Hook for consuming the context
export const useBoard = (): BoardContextShape => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};

// ------------------------------------
// function HomeOld() {
//   const [boardState, setBoardState] = useState<ArrayOfQueenPositions>([]);
//   const [boardSize, setBoardSize] = useState<number>(INITIAL_BOARD_SIZE);
//   const [refreshTime, _setRefreshTime] = useState<number>(INITIAL_REFRESH_TIME);
//   const [solver, setSolver] = useState<NQueensSolver>(new NQueensSolver(boardSize));
//   const [solutions, setBoardSolutions] = useState<ArrayOfQueenPositions[]>(solver.solutions);
//   const [stats, setStats] = useState<SolverStats>({ removed: 0, placed: 0, solved: 0 });

//   useEffect(() => {

//   const stateMap: Map<string, boolean> = reduce(
//     boardState,
//     (r, x): Map<string, boolean> => r.set(`${x[0]},${x[1]}`, true),
//     new Map<string, boolean>()
//   )

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const nextState = solver.moves.shift();
//       nextState && setBoardState(nextState);
//       const nextMoveType = solver.moveSequence.shift();
//       if (nextMoveType) {
//         stats[nextMoveType] += 1;
//         setStats({...stats});
//       }
//     }, refreshTime);
//     return () => clearInterval(interval);
//   }, [solver, refreshTime]);

//   return (
//     <>
//     <div className="container">
//       <div className="flex items-center justify-between px-2">
//         <div className="grid gap-1">
//           <h1 className="font-heading text-3xl md:text-4xl">Test Header</h1>
//           <p className="text-lg text-muted-foreground">Test Text</p>
//         </div>
//         <div className="grid gap-1">
//           <Button onClick={() => solver.solve()}>Solve</Button>
//         </div>
//         <div className="grid gap-1">
//           <Slider
//             onValueChange={(n) => {
//               const newSize = n.pop() || INITIAL_REFRESH_TIME;
//               setBoardSize(newSize);
//               setSolver(new NQueensSolver(newSize));
//             }}
//             style={{width: '200px'}}
//             defaultValue={[boardSize]}
//             max={15}
//             min={4}
//             step={1}
//           />
//         </div>
//       </div>
//       <div className="container">
//         <span className="">
//           {/* @ts-ignore */}
//           <Board boardSize={boardSize} boardState={stateMap}/>
//         </span>
//         <span className="">
//           <h1>stats</h1>
//           <div className="container">
//             <span>Solved</span><span>{stats.solved}</span>
//           </div>
//           <div className="container">
//             <span>Removed</span><span>{stats.removed}</span>
//           </div>
//           <div className="container">
//             <span>Placed</span><span>{stats.placed}</span>
//           </div>
//         </span>
//       </div>
//     </div>
//     </>
//   )
// }

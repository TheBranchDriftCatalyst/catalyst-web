import NQueensSolver, { QueenCoordinates } from '@/lib/n_queens_solver';
import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';

export type ArrayOfQueenPositions = QueenCoordinates[];
export type SolverStats = { removed: number, placed: number, solved: number }

interface BoardContextShape {
  solver: NQueensSolver;
  boardState: ArrayOfQueenPositions;
  boardSize: number;
  refreshTime: number;
  stats: SolverStats;
  solutions: ArrayOfQueenPositions[];
}

const INITIAL_REFRESH_TIME = 1;
const INITIAL_BOARD_SIZE = 6;
// Create the context
const BoardContext = createContext<BoardContextShape | undefined>(undefined);

// Define the provider component
interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {

  const [boardState, setBoardState] = useState<ArrayOfQueenPositions>([]);
  const [boardSize, setBoardSize] = useState<number>(INITIAL_BOARD_SIZE);
  const [refreshTime, _setRefreshTime] = useState<number>(INITIAL_REFRESH_TIME);
  const [solver, setSolver] = useState<NQueensSolver>(new NQueensSolver(boardSize));
  const [solutions, setBoardSolutions] = useState<ArrayOfQueenPositions[]>(solver.solutions);
  const [stats, setStats] = useState<SolverStats>({ removed: 0, placed: 0, solved: 0 });


  const startSolver = useCallback(() => {

  }, [boardSize, refreshTime]);

  // Provide the state and updater function to the context
  return (
    <BoardContext.Provider value={{boardState, boardSize, refreshTime, startSolver, solutions, stats }}>
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

//     const interval = setInterval(() => {
//       // the solver is solving at a rate that is way to fast to update the ui at, so we need to buffer
//       // the state updates
//       setStats(solver.stats);
//     }, refreshTime);
//     return () => clearInterval(interval);
//   }, [refreshTime]);


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

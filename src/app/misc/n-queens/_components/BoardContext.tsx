"use client";
import Debug from "debug";
import { cloneDeep } from "lodash";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import NQueensSolver from "../_lib/BacktrackingSolver";

const debug = Debug("nqueens:board-context");
debug.enabled = true;

export type SetOfQueenPositions = Set<string>;
export type SolverStats = { removed: number; placed: number; solved: number };

export type ReactStateUpdate<T> = [T, React.Dispatch<T>];

interface BoardContextShape {
  config: {
    refreshRate: ReactStateUpdate<number>;
    size: ReactStateUpdate<number>;
  };
  board: {
    state: SetOfQueenPositions;
    stats: SolverStats;
  };
  tracking: {
    scrubberPosition: ReactStateUpdate<number>;
    playing: ReactStateUpdate<boolean>;
  };
  solver: {
    instance: NQueensSolver;
    isRunning: boolean;
    start: () => boolean;
    bufferSize: number;
  };
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
};

export const BoardProvider: React.FC<BoardProviderProps> = ({
  solver,
  children,
}: BoardProviderProps) => {
  // config
  const [boardSize, setBoardSize] = useState(INITIAL_BOARD_SIZE);
  const [boardRefreshRate, setRefreshRate] = useState(INITIAL_REFRESH_TIME);

  // replay control
  const [scrubberPosition, setScrubberPosition] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  // solver to react connectors
  const solverInstance = useRef<NQueensSolver>(
    solver || new NQueensSolver(boardSize),
  );
  const [solverStats, setSolverStats] = useState<SolverStats>({
    removed: 0,
    placed: 0,
    solved: 0,
  });
  const [solverIsRunning, _setSolverIsRunning] = useState<boolean>(false);

  // we want this detached from the state so we can throttle the UI to a reasonable rate.
  const solverBuffer = useRef<SetOfQueenPositions[]>([new Set()]);
  const [solverBufferSize, setBufferSize] = useState<number>(0);

  const currentBoardState = solverBuffer.current[scrubberPosition];

  useEffect(() => {
    return solverInstance.current._bindOnMove((queens) => {
      const moveLookup = new Set(queens.map((q) => q.join(",")));
      solverBuffer.current.push(moveLookup);
    });
  }, [solverInstance]);

  const startSolver = useCallback(() => {
    if (solverIsRunning) {
      toast.error("Solver is already running");
      return false;
    }
    solverInstance.current.solve();
    _setSolverIsRunning(true);
    return true;
  }, [solverInstance, solverIsRunning]);

  const updateScrubberPositionAndPause = useCallback(
    (position: number) => {
      setScrubberPosition((p) => Math.min(p + 1, solverBufferSize));
      setPlaying(false);
    },
    [setScrubberPosition, setPlaying, solverBufferSize],
  );

  // render loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!solverIsRunning) {
        return;
      }
      debug("interval", { scrubberPosition, solverBuffer });

      setSolverStats(cloneDeep(solverInstance.current.stats));
      if (scrubberPosition < solverBuffer.current.length) {
        setScrubberPosition((p) => Math.min(p + 1, solverBufferSize));
      } else {
        setPlaying(false);
      }
      setBufferSize(solverBuffer.current.length);
    }, boardRefreshRate);
    return () => clearInterval(interval);
  }),
    [boardRefreshRate, solverInstance, solverIsRunning];

  return (
    <BoardContext.Provider
      value={{
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
          instance: solverInstance.current,
          isRunning: solverIsRunning,
          start: startSolver,
          bufferSize: solverBufferSize,
        },
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Hook for consuming the context
export const useBoard = (): BoardContextShape => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};

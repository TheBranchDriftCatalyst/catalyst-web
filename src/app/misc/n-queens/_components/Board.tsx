"use client";
// import Queen from './queen.svg'
import { ReactElement, useMemo } from "react";
import { useBoard } from "./BoardContext";

interface BoardPositionNodeProps {
  x: number;
  y: number;
}

const BoardPositionNode = ({ x, y }: BoardPositionNodeProps) => {
  const {
    board: { state: currentQueenLocations },
  } = useBoard();

  const hasQueen = useMemo(
    () => currentQueenLocations?.has(`${x},${y}`),
    [currentQueenLocations, x, y],
  );

  return (
    <div className={`${hasQueen ? "bg-primary" : null} w-10 h-10 border `}>
      {hasQueen && <img src="queen.svg" alt="queen" />}
    </div>
  );
};

export const Board = ({}): ReactElement => {
  const {
    config: {
      size: [boardSize],
    },
  } = useBoard();

  return (
    <div className="w-full h-full">
        {Array.from({ length: boardSize }, (_, x) => (
          <div key={`${x}`} className="flex flex-grow">
            {Array.from({ length: boardSize }, (_, y) => (
              <BoardPositionNode key={`${x},${y}`} x={x} y={y} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Board;

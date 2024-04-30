// import Queen from './queen.svg'
import { Card, CardContent } from "catalyst-ui";
import { ReactElement, useMemo } from "react";
import { useBoard } from "./BoardContext";

interface BoardPositionNodeProps {
  x: number;
  y: number;
}

const BoardPositionNode = ({ x, y }: BoardPositionNodeProps) => {

  const { board: { state: currentQueenLocations } } = useBoard();

  const hasQueen = useMemo(() => currentQueenLocations?.has(`${x},${y}`), [currentQueenLocations, x, y]);

  return (
    <div className={`w-10 h-10 border ${hasQueen ? 'bg-primary' : null}`}>
      {hasQueen && <img src="queen.svg" alt="queen" />}
    </div>
  );
};

export const Board = ({}): ReactElement => {
  const { config: { size: [boardSize] } } = useBoard();
  return (
    <Card className="">
      <CardContent>
        {Array.from({ length: boardSize }, (_, x) => (
          <div className="flex">
            {Array.from({ length: boardSize }, (_, y) => (
              <BoardPositionNode x={x} y={y} />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Board;

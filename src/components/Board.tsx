// import Queen from './queen.svg'
import { Typography as Text } from "catalyst-ui";
import React, { ReactElement } from 'react';
import styles from './Board.module.scss';
// import styles from './Board.module.scss';

export interface SquareProps {
  children?: React.ReactNode;
}

export interface FrameProps {
  children?: React.ReactNode;
  className?: string;
}

export interface BoardProps {
  boardState?: Map<string, boolean>;
  boardStateUpdate?: Function;
  boardSize: number;
}

export const Board = ({boardState, boardSize}: BoardProps): ReactElement => {
  const renderSquare = (i: number, j: number) => {
    const key = `${i},${j}`;
    return (
      <div key={key} className={`${styles.square} ${boardState?.has(key) ? styles.active : null}`}>
        <Text>
          {i}, {j}
        </Text>
      </div>
    )
  };

  const renderRow = (row: number) => {
    let squares = [];
    for (let j = 0; j < boardSize; j++) {
      squares.push(renderSquare(row, j));
    }
    return (
      <div key={`row-${row}`}  className="w-full h-20 bg-blue-500 flex justify-center items-center text-white">
        {squares}
      </div>
    );
  };


  const renderBoard = () => {
    let rows = [];
    for (let i = 0; i < boardSize; i++) {
      rows.push(renderRow(i));
    }
    return rows;
  };

  return (
    <div className={styles.board}>
      {renderBoard()}
    </div>
  );
}

export default Board;

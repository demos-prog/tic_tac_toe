import { useEffect, useRef } from 'react';
import cross from '../assets/icons/cross.svg';
import circle from '../assets/icons/circle.svg';

import './Cell.css';

type CellProps = {
  setState: React.Dispatch<React.SetStateAction<string[][]>>;
  setIsFirst: React.Dispatch<React.SetStateAction<boolean>>;
  coordsOfVictor: number[][];
  currentState: string;
  row: number;
  cell: number;
  isFirst: boolean;
  isEnd: boolean;
  isTie: boolean;
};

const Cell: React.FC<CellProps> = (
  { setState, setIsFirst, currentState, coordsOfVictor, row, cell, isFirst, isEnd, isTie }) => {

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const is_in_victor: boolean = coordsOfVictor?.some(coord => coord[0] === row && coord[1] === cell);
    if (is_in_victor) {
      imageRef.current?.classList.add('victoryBlink');
      setTimeout(() => {
        imageRef.current?.classList.remove('victoryBlink');
      }, 600)
    }
  }, [coordsOfVictor, row, cell]);

  function handleClick() {
    if (isEnd) return;
    if (currentState != "") return;
    setState((state: string[][]) => {
      return state.map((r: string[], i: number) => {
        if (i === row) {
          return r.map((item: string, index: number) => {
            if (index === cell) {
              if (isFirst) {
                return "X";
              }
              return "O";
            } else return item;
          });
        } else {
          return r;
        }
      }) as string[][];
    });
    setIsFirst((prev: boolean) => !prev);
  }

  return (
    <button className={isEnd || isTie ? "disabled" : ""} onClick={handleClick}>
      {currentState === "" && ""}
      {currentState === "X" && (<img ref={imageRef} src={cross} alt="cross" />)}
      {currentState === "O" && (<img ref={imageRef} src={circle} alt="circle" />)}
    </button>
  );

};

export default Cell;

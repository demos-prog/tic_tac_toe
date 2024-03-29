import { useEffect, useState } from 'react';
import './null_styles.css';

import Cell from './components/Cell';

import './App.css';

const start_field = [["", "", ""], ["", "", ""], ["", "", ""]];

type Winner = {
  isWinner: boolean,
  whoWon: string,
  coordsOfVictor: number[][],
}

function App() {
  const [state, setState] = useState<string[][]>(start_field);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [x_counter, setX_counter] = useState<number>(0);
  const [o_counter, setO_counter] = useState<number>(0);
  const [draw_counter, setDraw_counter] = useState<number>(0);

  const gamesPlayed = x_counter + o_counter + draw_counter + 1;

  function handleReset(): void {
    setState(start_field);
    setIsFirst(gamesPlayed % 2 !== 0);
  }

  function handleVictory(): Winner {
    let winner: string = "";
    let coordsOfVictor: number[][] = [];

    // Victory in row
    for (let i = 0; i < state.length; i++) {
      if (state[i][0] === state[i][1] && state[i][0] === state[i][2] && state[i][0] != "") {
        coordsOfVictor = [[i, 0], [i, 1], [i, 2]];
        return {
          isWinner: true,
          whoWon: state[i][0],
          coordsOfVictor,
        };
      }
    }

    // Victory in column
    for (let i = 0; i < 3; i++) {
      if (state[0][i] === state[1][i] && state[0][i] === state[2][i] && state[0][i] != "") {
        coordsOfVictor = [[0, i], [1, i], [2, i]];
        return {
          isWinner: true,
          whoWon: state[0][i],
          coordsOfVictor,
        };
      }
    }

    // Victory in diagonal
    if (state[0][0] === state[1][1] && state[0][0] === state[2][2] && state[0][0] != "") {
      coordsOfVictor = [[0, 0], [1, 1], [2, 2]];
      return {
        isWinner: true,
        whoWon: state[0][0],
        coordsOfVictor,
      };
    }
    if (state[0][2] === state[1][1] && state[0][2] === state[2][0] && state[0][2] != "") {
      coordsOfVictor = [[0, 2], [1, 1], [2, 0]];
      return {
        isWinner: true,
        whoWon: state[0][2],
        coordsOfVictor
      };
    }

    return {
      isWinner: false,
      whoWon: winner,
      coordsOfVictor,
    };
  }

  function handleTie(): boolean {
    for (const row of state) {
      for (const cell of row) {
        if (cell === "") return false;
      }
    }
    if (!victory.isWinner) {
      const field = document.querySelector('#field');
      field?.classList.add("blink");
      setTimeout(() => {
        field?.classList.remove('blink');
      }, 600)
    }
    return true
  }

  const victory = handleVictory();
  const isTie = handleTie();

  useEffect(() => {
    if (victory.isWinner) {
      if (victory.whoWon === "X") {
        setX_counter(prev => prev + 1);
      } else {
        setO_counter(prev => prev + 1);
      }
    }
    if (isTie && !victory.isWinner) setDraw_counter(prev => prev + 1);
  }, [isFirst])

  return (
    <div id='wrapper'>
      <div id='field'>
        {state.map((row, i) => {
          return <div className='row' key={i}>
            {row.map((item, j) => {
              return <Cell
                coordsOfVictor={victory.coordsOfVictor}
                isTie={isTie}
                isEnd={victory.isWinner}
                isFirst={isFirst}
                setIsFirst={setIsFirst}
                row={i}
                cell={j}
                currentState={item}
                setState={setState}
                key={j}
              />
            })}
          </div>
        })}
      </div>
      {isTie || victory.isWinner ? <div className='gg'>Game over !</div> : <div className='gg'>Next move: <span id="next">{isFirst ? "X" : "O"}</span></div>}
      <div id='wr'>
        {victory.isWinner && <div>Winner is: {victory.whoWon}</div>}
        {isTie && !victory.isWinner && <div>It's tie !</div>}
      </div>
      <div>Games played: {gamesPlayed - 1}</div>
      <div id='players_info'>
        <div className='sector'>
          <span>X-player:</span>
          <span>{x_counter}</span>
        </div>
        <div className='sector'>
          <span>Draws:</span>
          <span>{draw_counter}</span>
        </div>
        <div className='sector'>
          <span>O-player:</span>
          <span>{o_counter}</span>
        </div>
      </div>
      <button id='reset_btn' onClick={handleReset}>RESET</button>
    </div>
  )
}

export default App

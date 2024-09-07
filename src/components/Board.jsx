import { useEffect, useState } from "react";
import Square from "./Square";
import RestartBtn from "./RestartBtn";
import UndoBtn from "./UndoBtn";
import { calcWinner } from "../utils/calcWinner";
import StartBtn from "./StartBtn";
import { fireAlert, fireConfetti } from "../utils/func";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([squares]);
  const [step, setStep] = useState(0);
  const [canUndo, setCanUndo] = useState(false);
  const [timer, setTimer] = useState(15);
  const [isStart, setIsStart] = useState(false);

  const currentHistory = history.slice(0, step + 1);
  const currentSquares = currentHistory[currentHistory.length - 1];
  const handleClick = (index) => {
    if (calcWinner(currentSquares) || currentSquares[index] !== null) {
      return;
    }

    const squaresCopy = currentSquares.slice();
    squaresCopy[index] = isXNext ? "X" : "O";
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
    setHistory([...currentHistory, squaresCopy]);
    setStep(currentHistory.length);
    setCanUndo(true);
    setTimer(15);
    setIsStart(true);
  };

  const handleUndo = () => {
    setStep(step - 1);
    setIsXNext((step - 1) % 2 === 0);
    setCanUndo(false);
    const newSquares = history[step - 1];
    setSquares(newSquares);
    setTimer(15);
  };

  const handleAuto = () => {
    const emptySquares = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        emptySquares.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    // console.log(emptySquares[randomIndex]);
    handleClick(emptySquares[randomIndex]);

    setTimer(15);
  };
  const checkWinner = calcWinner(squares);

  //auto random when player dont't click any squares after 3s

  // useEffect(() => {
  //   let timerId;
  //   if (autoSelect) {
  //     timerId = setTimeout(() => {
  //       const emptySquares = [];
  //       for (let i = 0; i < squares.length; i++) {
  //         if (squares[i] == null) {
  //           emptySquares.push(i);
  //         }
  //       }
  //       const randomIndex = Math.floor(Math.random() * emptySquares.length);
  //       handleClick(emptySquares[randomIndex]);
  //     }, 3000);
  //   }
  //   return () => clearTimeout(timerId);
  // }, [autoSelect, squares]);

  // if (autoSelect) {
  //   const emptySquares = [];
  //   for (let i = 0; i < squares.length; i++) {
  //     if (squares[i] == null) {
  //       emptySquares.push(i);
  //     }
  //   }
  //   // console.log(emptySquares);
  //   const randomIndex = Math.floor(Math.random() * emptySquares.length);
  //   // console.log("lenght: ", emptySquares.length);
  //   // console.log("random", randomIndex);
  //   const timerId = setTimeout(() => {
  //     clearTimeout(timerId);
  //     handleClick(emptySquares[randomIndex]);
  //     setAutoSelect(false);
  //   }, 3000);
  // }

  const check = () => {
    let status = null;
    let isDraw = squares.every((squares) => squares !== null);

    if (checkWinner) {
      status = `Winner: ${checkWinner.winner}`;
      fireConfetti();
      fireAlert(`Winner: ${checkWinner.winner}`, "Congratulation🎉");
    } else if (isDraw) {
      status = "Draw";
      fireAlert("It's a draw!", "Draw😆");
    } else {
      status = `Turn player: ${isXNext ? "X" : "O"}`;
    }

    return status;
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setCanUndo(false);
    setTimer(15);
    setIsStart(false);
  };

  const handleStart = () => {
    setIsStart(true);
  };

  useEffect(() => {
    if (
      checkWinner ||
      squares.every((squares) => squares !== null) ||
      !isStart
    ) {
      return;
    }
    if (timer < 0) {
      handleAuto();
    }

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, handleRestart, isStart]);
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[#f1c40f] text-center text-4xl font-bold">
          Tic Tac Toe
        </h1>
        {/* <p>Press any square or start button to start the game! 🎉</p> */}
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between text-[20px]">
          <h5 className="text-[20px] ">{check()}</h5>
          <p
            className={
              timer === 3
                ? "text-[#f1c40f]"
                : timer === 2
                ? "text-[#F79F1F]"
                : "text-[#EA2027]"
            }
          >
            Timer: {timer}s
          </p>
        </div>
        <div className="grid grid-cols-3 ">
          {squares.map((item, index) => (
            <Square
              key={index}
              value={item}
              onSquareClick={() => handleClick(index)}
              color={
                squares[index] === null
                  ? ""
                  : squares[index] === "X"
                  ? "text-[#545454]"
                  : "text-[#F2EBD3]"
              }
              bgColor={
                checkWinner && checkWinner.lines.includes(index)
                  ? "bg-yellow-300"
                  : "bg-[#14bdac]"
              }
            />
          ))}
        </div>
        {!isStart && <StartBtn onhandleStart={handleStart} />}
        {squares.some((squares) => squares != null) && (
          <RestartBtn onhandleRestart={handleRestart} />
        )}
        {canUndo && !checkWinner && <UndoBtn onHandleUndo={handleUndo} />}
      </div>
    </div>
  );
};

export default Board;

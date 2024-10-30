import { useState } from "react";
import { toast } from "sonner";

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  function handleSquareClick(index) {
    if (squares[index]) {
      toast.warning("It is a draw");
    } else if (winner) {
      toast.success("There is a winner ");
    } else {
      const newSquares = squares.slice();
      newSquares[index] = currentPlayer;
      setSquares(newSquares);

      const newWinner = checkWinner(newSquares);
      if (newWinner) {
        setWinner(newWinner);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  }

  function checkWinner(passedSquares) {
    for (let combination of winningCombination) {
      const [a, b, c] = combination;
      if (
        passedSquares[a] &&
        squares[a] === passedSquares[b] &&
        squares[b] === passedSquares[c] &&
        squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  }

  return (
    <div className="">
      <div className="grid place-content-center h-[80vh] gap-5">
        <h1 className="text-green-500 text-[36px] uppercase text-center">
          Simple tic-tac-toe
        </h1>

        <div className="shadow-sm shadow-gray-200 grid grid-cols-3 size-[450px] gap-3 my-4">
          {squares.map((square, index) => (
            <button
              onClick={() => handleSquareClick(index)}
              className="bg-green-500 text-[50px] text-white h-[150px]"
              key={index}
            >
              {square}
            </button>
          ))}
        </div>
        {winner ? (
          <h3 className="text-lg">
            Winner: <span className="text-3xl">{winner}</span>
          </h3>
        ) : (
          <h3 className="text-lg">
            {" "}
            Next Player:<span className="text-3xl">{currentPlayer} </span>
          </h3>
        )}
        <button
          className="bg-green-600 text-white py-3 rounded-md"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;

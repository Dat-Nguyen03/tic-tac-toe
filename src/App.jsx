import Board from "./components/Board";

const App = function () {
  return (
    <div
      style={{ fontFamily: "Fredoka,sans-serif" }}
      className="flex justify-center items-center h-[100vh]"
    >
      <Board />
    </div>
  );
};

export default App;

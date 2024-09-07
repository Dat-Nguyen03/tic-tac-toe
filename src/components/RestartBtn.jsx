const RestartBtn = ({ onhandleRestart }) => {
  return (
    <button onClick={onhandleRestart} className="text-white bg-red-300 py-2">
      Restart
    </button>
  );
};
export default RestartBtn;

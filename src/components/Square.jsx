const Square = ({ value, onSquareClick, color, bgColor }) => {
  // console.log(value);
  return (
    <button
      onClick={onSquareClick}
      className={`${bgColor} w-[100px] h-[100px] text-[60px] text-white border-[5px] border-[#0DA192] font-bold ${color}`}
    >
      {value}
    </button>
  );
};

export default Square;

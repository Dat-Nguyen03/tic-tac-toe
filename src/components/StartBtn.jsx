import React from "react";

const StartBtn = ({ onhandleStart }) => {
  return (
    <button onClick={onhandleStart} className="text-white bg-yellow-500 py-2">
      Start
    </button>
  );
};

export default StartBtn;

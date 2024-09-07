const UndoBtn = ({ onHandleUndo }) => {
  return (
    <button onClick={onHandleUndo} className="text-white bg-green-500 py-2">
      <i className="fa-solid fa-rotate-left"></i> Undo
    </button>
  );
};

export default UndoBtn;

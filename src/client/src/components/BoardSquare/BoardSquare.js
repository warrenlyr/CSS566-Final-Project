import React from "react";
import "./styles.css";

const BoardSquare = ({ letter, row, col, handleClick, clicked, opened }) => {
	return (
		<button
			className={`square ${clicked ? "squareClicked" : null}`}
			onClick={() => handleClick(row, col, letter)}
		>
			{opened ? letter : " "}
		</button>
	);
};

export default BoardSquare;

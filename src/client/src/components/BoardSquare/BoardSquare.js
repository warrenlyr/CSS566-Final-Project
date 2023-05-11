import React from "react";

const BoardSquare = ({ letter }) => {
	return (
		<button className="square" onClick={() => alert(letter)}>
			{letter}
		</button>
	);
};

export default BoardSquare;

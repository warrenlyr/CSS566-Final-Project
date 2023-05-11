import React, { useEffect } from "react";
import "./styles.css";
import BoardSquare from "../BoardSquare/BoardSquare";

const GameGrid = ({ puzzle, size, words }) => {
	return (
		<>
			<div className="wordsContainer">
				{words.map((word) => {
					return (
						<div className="gameWord" key={word}>
							{word}
						</div>
					);
				})}
			</div>

			<div className="puzzleBoard">
				{puzzle.map((row) => {
					return (
						<div className="boardRow">
							{row.map((letter) => {
								return <BoardSquare letter={letter} />;
							})}
						</div>
					);
				})}
			</div>
			<div>timer, number tries, buttons</div>
		</>
	);
};

export default GameGrid;

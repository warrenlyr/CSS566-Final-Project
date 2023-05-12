import React, { useEffect, useState } from "react";
import "./styles.css";
import BoardSquare from "../BoardSquare/BoardSquare";
import Timer from "../Timer/Timer";

const GameGrid = ({ puzzle, size, words }) => {
	const [selectedBlocks, setSelectedBlocks] = useState([]);
	const [remainingWords, setRemainingWords] = useState(words);
	const [openedLetters, setOpenedLetters] = useState([]);
	const [numberOfTries, setNumberOfTries] = useState(size);
	const [stopTimer, setStopTimer] = useState(false);

	const maxSelected = size;

	const handleClick = (row, col, letter) => {
		const newBlock = { row: row, col: col, letter: letter };
		if (
			!selectedBlocks.some((block) => block.row === row && block.col === col) &&
			selectedBlocks.length < maxSelected
		) {
			setSelectedBlocks([...selectedBlocks, newBlock]);
		}
	};

	useEffect(() => {
		if (numberOfTries === 0 || remainingWords.length === 0) {
			console.log("game ends");
			setStopTimer(true);
		}
	}, [numberOfTries, remainingWords]);

	const handleConfirm = () => {
		let word = "";
		for (let i = 0; i < selectedBlocks.length; i++) {
			const block = selectedBlocks[i];
			word = word + block.letter;
		}

		const prevOpenedLetters = openedLetters;
		const newArray = openedLetters.concat(selectedBlocks);
		setOpenedLetters(newArray);

		if (remainingWords.includes(word)) {
			setRemainingWords((wordsLeft) => wordsLeft.filter((w) => w !== word));
			const newArray = openedLetters.concat(selectedBlocks);
			setOpenedLetters(newArray);
		} else {
			console.log("wrong word");
			setNumberOfTries(numberOfTries - 1);
			setTimeout(() => {
				setOpenedLetters(prevOpenedLetters);
			}, 2000);
		}
		handleClear();
	};

	const handleClear = () => {
		setSelectedBlocks([]);
	};

	return (
		<>
			<div className="wordsContainer">
				{remainingWords.map((word) => {
					return (
						<div className="gameWord" key={word}>
							{word}
						</div>
					);
				})}
			</div>

			<div className="puzzleBoard">
				{puzzle.map((row, rowIndex) => {
					return (
						<div className="boardRow" key={rowIndex}>
							{row.map((letter, colIndex) => {
								return (
									<BoardSquare
										key={`${rowIndex}-${colIndex}`}
										letter={letter}
										row={rowIndex}
										col={colIndex}
										handleClick={handleClick}
										clicked={selectedBlocks.some(
											(b) =>
												b.row === rowIndex &&
												b.col === colIndex &&
												b.letter === letter
										)}
										opened={openedLetters.some(
											(b) =>
												b.row === rowIndex &&
												b.col === colIndex &&
												b.letter === letter
										)}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
			<Timer stopTimer={stopTimer} />
			<div>
				<button onClick={handleConfirm}>Confirm</button>
				<button onClick={handleClear}>Clear</button>
			</div>
			<div>{numberOfTries} tries left</div>
		</>
	);
};

export default GameGrid;

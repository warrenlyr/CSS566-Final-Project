import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import BoardSquare from "../BoardSquare/BoardSquare";
import Timer from "../Timer/Timer";
import Modal from "../Modal/modal";
import Leaderboard from "../LeaderBoard/leaderboard";
import Button from "../Button/Button";

const GameGrid = ({
	puzzle,
	size,
	words,
	level,
	type,
	gameHistoryId,
	token,
}) => {
	const [selectedBlocks, setSelectedBlocks] = useState([]);
	const [guessedWords, setGuessedWords] = useState([]);
	const [openedLetters, setOpenedLetters] = useState([]);
	const [time, setTime] = useState(0);
	const [numberOfAttempts, setNumberOfAttempts] = useState(0);
	const [finishedGameData, setFinishedGameData] = useState({});

	const [canContinue, setCanContinue] = useState(true);
	const [openLeaderboard, setOpenLeaderboard] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [stopTimer, setStopTimer] = useState(false);

	const maxSelected = size;

	const handleClick = (row, col, letter) => {
		if (canContinue) {
			const newBlock = { row: row, col: col, letter: letter };
			if (
				!selectedBlocks.some(
					(block) => block.row === row && block.col === col
				) &&
				selectedBlocks.length < maxSelected
			) {
				setSelectedBlocks([...selectedBlocks, newBlock]);
			} else {
				if (
					selectedBlocks.some((block) => block.row === row && block.col === col)
				) {
					setSelectedBlocks(
						selectedBlocks.filter(
							(block) => block.row !== row || block.col !== col
						)
					);
				} else {
					toast.info("Maximum amount of letters selected");
				}
			}
		} else {
			toast.info("Wait for the previous blocks to close", {
				autoClose: 1000,
			});
		}
	};

	const handleConfirm = () => {
		let word = "";
		let prevNeighbors = null;

		for (let i = 0; i < selectedBlocks.length; i++) {
			const block = selectedBlocks[i];
			if (i === 0) {
				prevNeighbors = getBlockNeighbors(block.row, block.col);
			} else {
				if (
					prevNeighbors.some(
						(neighbor) =>
							neighbor.row === block.row && neighbor.col === block.col
					)
				) {
					prevNeighbors = getBlockNeighbors(block.row, block.col);
				} else {
					break;
				}
			}
			word = word + block.letter;
		}

		const prevOpenedLetters = openedLetters;
		const newArray = openedLetters.concat(selectedBlocks);
		setOpenedLetters(newArray);
		setNumberOfAttempts(numberOfAttempts + 1);

		if (words.includes(word)) {
			setGuessedWords([...guessedWords, word]);
			toast.success(`Word found, ${word}`);
			handleClear();
		} else {
			const closeTime = level === 1 || level === 3 ? 3000 : 4000;
			setCanContinue(false);
			toast.error("Wrong word, Try again", {
				autoClose: closeTime,
			});

			if (level === 1) {
				setCanContinue(true);
				handleClear();
			} else if (level === 2) {
				setTimeout(() => {
					setOpenedLetters(prevOpenedLetters);
					setCanContinue(true);
					handleClear();
				}, 4700);
			} else {
				setTimeout(() => {
					setOpenedLetters(prevOpenedLetters);
					setCanContinue(true);
					handleClear();
				}, 3700);
			}
		}
	};

	const handleClear = () => {
		setSelectedBlocks([]);
	};

	const getBlockNeighbors = (row, col) => {
		const neighbors = [];
		const row_limit = puzzle.length;
		if (row_limit > 0) {
			const column_limit = puzzle[0].length;
			for (
				let r = Math.max(0, row - 1);
				r <= Math.min(row + 1, row_limit - 1);
				r++
			) {
				for (
					let c = Math.max(0, col - 1);
					c <= Math.min(col + 1, column_limit - 1);
					c++
				) {
					if (r !== row || c !== col) {
						const neighbor = {
							row: r,
							col: c,
							letter: puzzle[r][c],
						};
						neighbors.push(neighbor);
					}
				}
			}
		}
		return neighbors;
	};

	const endGame = async () => {
		setStopTimer(true);
		const data = {
			time_elapsed: time,
			attemps: numberOfAttempts,
		};
		if (token === null) {
			await apiInstance
				.post(`/game/finish/${gameHistoryId}`, data)
				.then((res) => {
					setFinishedGameData(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			await authApiInstance
				.post(`/game/finish/${gameHistoryId}`, data)
				.then((res) => {
					setFinishedGameData(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		setIsOpen(true);
	};

	let navigate = useNavigate();
	const handleModalClose = () => {
		setIsOpen(false);
		navigate("/");
	};

	useEffect(() => {
		if (guessedWords.length === words.length) {
			endGame();
		}
	}, [guessedWords, words]);

	return (
		<>
			<div className="gameContainer">
				<div className="gameWordsContainter">
					<div className="wordsContainer">
						<div>WORDS TO FIND</div>
						<br />
						{words.map((word) => {
							return (
								<div
									className={`${
										guessedWords.includes(word) ? "guessedWord" : null
									} gameWord`}
									key={word}
								>
									{word}
								</div>
							);
						})}
					</div>
					<div className="game">
						<div className="gameFunctions">
							<Timer stopTimer={stopTimer} time={time} setTime={setTime} />
							<span className="blockSelect">
								{selectedBlocks.length} selected
							</span>
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
													clicked={
														canContinue
															? selectedBlocks.some(
																(b) =>
																	b.row === rowIndex &&
																	b.col === colIndex &&
																	b.letter === letter
															)
															: false
													}
													opened={openedLetters.some(
														(b) =>
															b.row === rowIndex &&
															b.col === colIndex &&
															b.letter === letter
													)}
													level={level}
												/>
											);
										})}
									</div>
								);
							})}
						</div>
						<div className="boardButtons">
							<Button
								additionalStyles={"boardButton"}
								buttonType={"button"}
								handleClick={handleConfirm}
							>
								Confirm
							</Button>
							<Button
								additionalStyles={"boardButton"}
								buttonType={"button"}
								handleClick={handleClear}
							>
								Clear
							</Button>
						</div>
					</div>
				</div>

				<div className="dailyLeaderboard">
					<Button
						additionalStyles={"leadearboardButton"}
						type={"button"}
						handleClick={() => setOpenLeaderboard(!openLeaderboard)}
					>
						{openLeaderboard ? "Close leaderboard" : "Open Leaderboard"}
					</Button>
					<Leaderboard
						styles={`${
							!openLeaderboard ? "hideLeaderboard" : null
						} leaderboardStyles`}
						type={type}
						level={level}
					/>
				</div>
			</div>

			<Modal open={isOpen} onClose={handleModalClose}>
				{finishedGameData.error && finishedGameData.score === 0 ? (
					<>
						<div className="modalTitle">Uh Oh!</div>
						<p className="gameEndText">{finishedGameData.error}</p>
						<div className="score">Your score: {finishedGameData.score}</div>
					</>
				) : (
					<>
						<div className="modalTitle">Puzzle Solved!</div>
						<p className="gameEndText">
							Great job, you have solved the Daily Puzzle!
						</p>
						<div className="score">Your score: {finishedGameData.score}</div>
						{token !== null ? (
							<Button
								additionalStyles={"shareButton"}
								type={"button"}
								handleClick={() => alert("shared with username")}
							>
								Share my score
							</Button>
						) : null}
						<Button
							additionalStyles={"shareButton"}
							type={"button"}
							handleClick={() => alert("shared anonymously")}
						>
							Share my score anonymously
						</Button>
					</>
				)}
			</Modal>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme="dark"
			/>
		</>
	);
};

export default GameGrid;

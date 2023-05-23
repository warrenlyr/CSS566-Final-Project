import React, { useState } from "react";
import "./styles.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";
import DesignSquare from "../../components/DesignSquare/designSquare";
import Spinner from "../../components/Spinner/Spinner";

const DesignPuzzle = () => {
	const [wordList, setWordList] = useState("");
	const [levelDifficulty, setLevelDifficulty] = useState({ value: 1, label: "1" });
	const [puzzleData, setPuzzleData] = useState({});
	const [gameID, setGameID] = useState("");
	const [showBoard, setShowBoard] = useState(false);
	const [loading, setLoading] = useState(false);

	const options = [
		{ value: 1, label: "1" },
		{ value: 2, label: "2" },
		{ value: 3, label: "3" },
	];

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const containsLetters = /^[A-Za-z\s]*$/.test(wordList);
		if (containsLetters) {
			const data = {
				words: wordList,
				level: levelDifficulty.value
			};
			await apiInstance
				.post("/game/designpuzzle/create", data)
				.then((res) => {
					setPuzzleData(res.data.game);
					setGameID(res.data.game_id);
				}).catch((e) => {
					toast.error(e.response.data.error);
				});
			setShowBoard(true);
			
		} else {
			toast.error("Words are not containing just letters.");
			setShowBoard(false);
		}
		setLoading(false);
	};

	const handlechange = (e) => {
		setWordList(e.target.value);
	};

	const handleConfirm = async () => {
		const data = {
			game_id: gameID,
		};

		await apiInstance
			.post("/game/designpuzzle/submit", data)
			.then((res) => {
				if (res.data.status) {
					toast.success("Puzzle successfully created");
				}
			}).catch(() => {
				toast.error("Something went wrong");
			});
	};
	

	return (
		<>
			<div className="designContainer">
				<div className="designTitle">Design Your Own Puzzle</div>
				<form onSubmit={handleSubmit} className="puzzleForm">
					<label htmlFor="wordList" className="wordsLabel">
						Word List
					</label>
					<input
						value={wordList}
						onChange={handlechange}
						type="text"
						className="wordsInput"
					/>
					<label htmlFor="difficulty" className="difficultyLabel">
						Level Difficulty
					</label>
					<Select
						className="wordsDropdown"
						defaultValue={options[0]}
						options={options}
						onChange={setLevelDifficulty}
					/>
					<Button type={"submit"} additionalStyles={"wordsButton"}>
						Generate
					</Button>
				</form>
				{showBoard && Object.keys(puzzleData).length !== 0 ? (
					<div className="gameWordsContainer">
						<div className="wordsContainer">
							<div>WORDS TO FIND</div>
							<br />
							{puzzleData.words.map((word) => {
								return (
									<div
										className="gameWord"
										key={word}
									>
										{word}
									</div>
								);
							})}
						</div>
						<div className="designGame">
							<div className="designBoard">
								{puzzleData.puzzle.map((row, rowIndex) => {
									return (
										<div className="boardRow" key={rowIndex}>
											{row.map((letter, colIndex) => {
												return (
													<DesignSquare
														key={`${rowIndex}-${colIndex}`}
														letter={letter}
														level={levelDifficulty}
													/>
												);
											})}
										</div>
									);
								})}
							</div>
							<div className="designButtons">
								<Button
									additionalStyles={"designButton"}
									buttonType={"button"}
									handleClick={handleConfirm}
								>
									Confirm
								</Button>
								<Button
									additionalStyles={"designButton"}
									buttonType={"submit"}
									handleClick={handleSubmit}
								>
									Refresh
								</Button>
							</div>
						</div>
					</div>
				): null}
			</div>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme="dark"
			/>
			{loading ?
				<Spinner /> : null
			}
		</>
	);
};

export default DesignPuzzle;

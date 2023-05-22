import React, { useState } from "react";
import "./styles.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Button from "../../components/Button/Button";

const DesignPuzzle = () => {
	const [wordList, setWordList] = useState("");
	const [levelDifficulty, setLevelDifficulty] = useState({ value: 1, label: "1" });
	const [showBoard, setShowBoard] = useState(false);

	const options = [
		{ value: 1, label: "1" },
		{ value: 2, label: "2" },
		{ value: 3, label: "3" },
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		const containsLetters = /^[A-Za-z\s]*$/.test(wordList);

		if (containsLetters) {
			console.log(wordList, levelDifficulty.value);
			setShowBoard(true);
			
		} else {
			toast.error("Words are not containing just letters.");
			setShowBoard(false);
		}
	};

	const handlechange = (e) => {
		setWordList(e.target.value);
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
					{/* <select
						value={levelDifficulty}
						onChange={}
						className="wordsDropdown"
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
					</select> */}
					<Button type={"submit"} additionalStyles={"wordsButton"}>
						Generate
					</Button>
				</form>
				{showBoard ? (
					<>
						<div className="wordsContainer">
							<div>WORDS TO FIND</div>
							<br />
							{wordList.split(" ").map((word) => {
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
					</>
				): null}
			</div>
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

export default DesignPuzzle;

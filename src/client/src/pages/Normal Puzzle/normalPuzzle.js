import React, { useState, useEffect } from "react";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";
import "./styles.scss";
import Spinner from "../../components/Spinner/Spinner";
import GameGrid from "../../components/GameGrid/GameGrid";
import Select from "react-select";


const NormalPuzzle = ({ token }) => {
	const [gameData, setGameData] = useState({});
	const [gameHistoryId, setGameHistoryId] = useState("");
	const [noGame, setNoGame] = useState(null);
	const [level, setLevel] = useState({ value: 1, label: "1" });
	const [loading, setLoading] = useState(true);

	const options = [
		{ value: 1, label: "1" },
		{ value: 2, label: "2" },
		{ value: 3, label: "3" },
	];

	const getGame = async () => {
		setLoading(true);
		if (token === null) {
			await apiInstance
				.get(`/game/normalpuzzle/${level.value}`)
				.then((res) => {
					const data = res.data.game_data;
					setGameData(data);
					setGameHistoryId(res.data.game_history_id);
					setNoGame(false);
				})
				.catch(() => {
					setNoGame(true);
				});
		} else {
			await authApiInstance
				.get(`/game/normalpuzzle/${level.value}`)
				.then((res) => {
					const data = res.data.game_data;
					setGameData(data);
					setGameHistoryId(res.data.game_history_id);
					setNoGame(false);
				})
				.catch(() => {
					setNoGame(true);
				});
		}
		setLoading(false);
	};

	useEffect(() => {
		getGame();
	}, [level]);

	return (
		<>
			{noGame === null || loading ? (
				<Spinner />
			) : noGame ? (
				<>
					<div className="normalTitle">Normal Puzzle</div>
					<div className="noGameText">
            Sorry No Daily Puzzle Available, come back later!
					</div>
				</>
			) : (
				<>
					<div className="normalTitle">Normal Puzzle</div>
					<Select
						className="levelDropdown"
						defaultValue={options[0]}
						options={options}
						onChange={setLevel}
					/>
					<GameGrid
						puzzle={gameData.puzzle}
						size={gameData.size}
						words={gameData.words}
						level={gameData.level}
						gameId={gameData._id}
						gameHistoryId={gameHistoryId}
						token={token}
					/>
				</>
			)}
		</>
	);
};

export default NormalPuzzle;
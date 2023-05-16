import React, { useEffect, useState } from "react";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";
import "./styles.css";
import Spinner from "../../components/Spinner/Spinner";
import GameGrid from "../../components/GameGrid/GameGrid";

const DailyPuzzle = ({ token }) => {
	const [gameData, setGameData] = useState({});
	const [gameHistoryId, setGameHistoryId] = useState("");
	const [noGame, setNoGame] = useState(null);

	const getGame = async () => {
		if (token === null) {
			await apiInstance
				.get("/game/normalpuzzle/2")
				.then((res) => {
					const data = res.data.game_data;
					setGameData(data);
					setGameHistoryId(res.data.game_history_id);
					setNoGame(false);
				})
				.catch((error) => {
					setNoGame(true);
				});
		} else {
			await authApiInstance
				.get("/game/normalpuzzle/2")
				.then((res) => {
					const data = res.data.game_data;
					setGameData(data);
					setGameHistoryId(res.data.game_history_id);
					setNoGame(false);
				})
				.catch((error) => {
					setNoGame(true);
				});
		}
	};

	useEffect(() => {
		getGame();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{noGame === null ? (
				<Spinner />
			) : noGame ? (
				<>
					<div className="pageTitle">Daily Puzzle</div>
					<div className="noGameText">
						Sorry No Daily Puzzle Available, come back later!
					</div>
				</>
			) : (
				<>
					<div className="pageTitle">Daily Puzzle</div>
					<GameGrid
						puzzle={gameData.puzzle}
						size={gameData.size}
						words={gameData.words}
						level={gameData.level}
						type={gameData.type}
						gameHistoryId={gameHistoryId}
						token={token}
					/>
				</>
			)}
		</>
	);
};

export default DailyPuzzle;

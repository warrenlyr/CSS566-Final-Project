import React, { useEffect, useState } from "react";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";
import "./styles.scss";
import Spinner from "../../components/Spinner/Spinner";
import GameGrid from "../../components/GameGrid/GameGrid";

const DailyPuzzle = ({ token }) => {
	const [gameData, setGameData] = useState({});
	const [gameHistoryId, setGameHistoryId] = useState("");
	const [noGame, setNoGame] = useState(null);
	const [noGameText, setNoGameText] = useState("Sorry No Daily Puzzle Available, come back later!");

	const getGame = async () => {
		if (token === null) {
			await apiInstance
				.get("/game/dailypuzzle")
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
				.get("/game/dailypuzzle")
				.then((res) => {
					console.log(res);
					const data = res.data.game_data;
					setGameData(data);
					setGameHistoryId(res.data.game_history_id);
					setNoGame(false);
				})
				.catch((error) => {
					if(error.response.status == 423) {
						setNoGameText("You have already played daily puzzle today!");
					}
					setNoGame(true);
				});
		}
	};

	useEffect(() => {
		getGame();
	}, []);

	return (
		<>
			{noGame === null ? (
				<Spinner />
			) : noGame ? (
				<>
					<div className="dailyTitle">Daily Puzzle</div>
					<div className="noGameText">
						{noGameText}
					</div>
				</>
			) : (
				<>
					<div className="dailyTitle">Daily Puzzle</div>
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

export default DailyPuzzle;

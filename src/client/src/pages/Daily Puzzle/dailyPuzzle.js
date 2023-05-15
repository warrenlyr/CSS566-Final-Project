import React, { useEffect, useState } from "react";
import GameGrid from "../../components/GameGrid/GameGrid";
import { apiInstance } from "../../services/apiInstance";
import "./styles.css";
import Spinner from "../../components/Spinner/Spinner";

const DailyPuzzle = () => {
	const [gameData, setGameData] = useState({});
	const [noGame, setNoGame] = useState(null);

	const getGame = async () => {
		await apiInstance
			.get("/game/normal/3")
			.then((res) => {
				const data = res.data;
				setGameData(data);
				setNoGame(false);
			})
			.catch((error) => {
				setNoGame(true);
			});
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
					/>
				</>
			)}
		</>
	);
};

export default DailyPuzzle;

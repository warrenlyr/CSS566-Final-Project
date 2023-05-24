/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";
import "./styles.scss";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import GameGrid from "../../components/GameGrid/GameGrid";

const normalPuzzle = ({ token }) => {
	const [gameData, setGameData] = useState({});
	const [gameHistoryId, setGameHistoryId] = useState("");
	const [noGame, setNoGame] = useState(null);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleLevelOne = async () => {
		if (token === null) {
			await apiInstance
				.get("/game/normalpuzzle/1")
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
				.get("/game/normalpuzzle/1")
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
		setOpen(false);
	};

	const handleLevelTwo = async () => {
		if (token === null) {
			await apiInstance
				.get("/game/normalpuzzle/2")
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
				.get("/game/normalpuzzle/2")
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
		setOpen(false);
	};

	const handleLevelThree = async () => {
		if (token === null) {
			await apiInstance
				.get("/game/normalpuzzle/3")
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
				.get("/game/normalpuzzle/3")
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
		setOpen(false);
	};

	useEffect(() => {
		handleLevelOne();
		handleLevelTwo();
		handleLevelThree();
	}, []);

	return (
		<>
			{noGame === null ? (
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
					<div className="pageTitle">Normal Puzzle</div>
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

			<Dropdown
      				trigger={<Button>Choose the Level:</Button>}
      					menu={[
        				<Button onClick={handleLevelOne}>Level 1</Button>,
        				<Button onClick={handleLevelTwo}>Level 2</Button>,
					<Button onClick={handleLevelThree}>Level 3</Button>,
      				]}
    			/>

		</>
	);
};

const Dropdown = ({ open, trigger, menu }) => {
  	return (
    		<div className="dropdown">
      		{trigger}
      			{open ? (
        			<ul className="menu">
          				{menu.map((menuItem, index) => (
            					<li key={index} className="menu-item">{menuItem}</li>
          				))}
        			</ul>
      			) : null}
    		</div>
  	);
};

export default normalPuzzle;

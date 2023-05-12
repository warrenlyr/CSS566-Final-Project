// import React, { Component } from "react";
// import "./styles.css";

// export class game extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			dummyplayers: [
// 				{
// 					name: "User A",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User B",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User C",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User D",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User E",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User F",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User G",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User H",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User I",
// 					time: "XX:XX",
// 				},
// 				{
// 					name: "User J",
// 					time: "XX:XX",
// 				},
// 			],
// 		};
// 	}

// 	render() {
// 		return (
// 			<div className="Landing">
// 				<h1>Today's Reward Game</h1>
// 				<div className="Board">
// 					<h1 className="leaderboard"> Leaderboard</h1>
// 					<table className="table ">
// 						<col style={{ width: "10%" }} />
// 						<col style={{ width: "80%" }} />
// 						<col style={{ width: "10%" }} />
// 						<tbody>
// 							{this.state.dummyplayers.map((el, Rank) => {
// 								return (
// 									<tr>
// 										<td className="border-0"> {Rank + 1} </td>
// 										<td className="border-0"> {el.name} </td>
// 										<td className="border-0"> {el.time} </td>
// 									</tr>
// 								);
// 							})}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default game;

import React, { useEffect, useState } from "react";
import GameGrid from "../../components/GameGrid/GameGrid";
import { apiInstance } from "../../services/apiInstance";
import "./styles.css";
import Spinner from "../../components/Spinner/Spinner";

const DailyPuzzle = () => {
	const [puzzle, setPuzzle] = useState([]);
	const [puzzleSize, setPuzzleSize] = useState(0);
	const [words, setWords] = useState([]);
	const [noGame, setNoGame] = useState(null);

	const getGame = async () => {
		await apiInstance
			.get("/game/normal/2")
			.then((res) => {
				const data = res.data;
				setPuzzle(data.puzzle);
				setPuzzleSize(data.size);
				setWords(data.words);
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
				<div>Sorry No Daily Puzzle Available, come back later!</div>
			) : (
				<>
					<div className="pageTitle">Daily Puzzle</div>
					<GameGrid puzzle={puzzle} size={puzzleSize} words={words} />
				</>
			)}
		</>
	);
};

export default DailyPuzzle;

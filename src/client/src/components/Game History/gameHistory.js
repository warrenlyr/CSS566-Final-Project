import React from "react";
import "./styles.css";

const GameHistory = () => {
	const dummyHistory = [
		{
			name: "Daily Puzzle",
			score: "2:20",
			date: "5/2/2023",
		},
		{
			name: "Normal Game: Level 1",
			score: "23:20",
			date: "5/2/2023",
		},
		{
			name: "Normal Game: Level 1",
			score: "23:20",
			date: "5/2/2023: 5.20pm",
		},
		{
			name: "Normal Game: Level 3",
			score: "1:20",
			date: "5/2/2023: 5.20pm",
		},
		{
			name: "Normal Game: Level 2",
			score: "23:20",
			date: "5/2/2023: 5.20pm",
		},
	];
	return (
		<div className="gameHistoryContainer">
			<div className="gameHistoryTitle">User History</div>
			<table>
				<tbody>
					{dummyHistory.map((el) => {
						return (
							<tr>
								<td>{el.name}</td>
								<td>score: {el.score}</td>
								<td>{el.date}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default GameHistory;

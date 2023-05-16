import React, { useEffect, useState } from "react";
import "./styles.css";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";

const GameHistory = ({styles, type, level}) => {
	const [gameHistoryData, setGameHistoryData] = useState([]);
	
	useEffect(() => {fetchData();});

	const fetchData = async() => {
		let path = "";
		if(type === "todaysrewards"){
			path = "/gameHistory/todaysrewardgame";
		}
		else{
			path = `/game/level/${level}`;
		}
		await apiInstance
		.get(path)
		.then((res) => {
			const data = res.data.data;
			console.log(data);
			setGameHistoryData(data);
		})
		.catch((error) => {
			console.log(error);
		});
	};

	// const dummyHistory = [
	// 	{
	// 		name: "Daily Puzzle",
	// 		score: "2:20",
	// 		date: "5/2/2023",
	// 	},
	// 	{
	// 		name: "Normal Game: Level 1",
	// 		score: "23:20",
	// 		date: "5/2/2023",
	// 	},
	// 	{
	// 		name: "Normal Game: Level 1",
	// 		score: "23:20",
	// 		date: "5/2/2023: 5.20pm",
	// 	},
	// 	{
	// 		name: "Normal Game: Level 3",
	// 		score: "1:20",
	// 		date: "5/2/2023: 5.20pm",
	// 	},
	// 	{
	// 		name: "Normal Game: Level 2",
	// 		score: "23:20",
	// 		date: "5/2/2023: 5.20pm",
	// 	},
	// ];

	return (
		<div className= {`gameHistoryContainer ${styles}`}>
			<div className="gameHistoryTitle">User History</div>
			<table>
				<tbody>
					{gameHistoryData.map((el) => {
						return (
							<tr className = "gameHistoryItem">
								<td className="item">{el.item}</td>
								<td className="detail">{el.detail}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default GameHistory;

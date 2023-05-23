import React, { useEffect, useState } from "react";
import "./styles.scss";
import { authApiInstance } from "../../services/authApiInstance";

const GameHistory = ({ styles}) => {
	const [gameHistoryData, setGameHistoryData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const path = "/auth/user/gamehistory";

		await authApiInstance
			.get(path)
			.then((res) => {
				const data = res.data;
				setGameHistoryData(data);
			})
			.catch((error) => {
				console.log(error); 
			});
	};

	return (
		<div className={`gameHistoryContainer ${styles}`}>
			<div className="gameHistoryTitle">User History</div>
			<table>
				<thead>
					<tr>
						<th>Game Name</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Finished</th>
						<th>Attempts</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{gameHistoryData.map((game) => {
						return (
							<tr className="gameHistoryItem" key={game.game_history_id}>
								<td>{game.game_name}</td>
								<td>{game.start_time}</td>
								<td>{game.end_time ? game.end_time : "Still playing"}</td>
								<td>{game.finished ? "Yes" : "No"}</td>
								<td>{game.attempts}</td>
								<td>{game.score}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default GameHistory;

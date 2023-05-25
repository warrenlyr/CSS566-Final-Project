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
				let data = res.data;

				data.sort((a, b) => {
					const dateTimePartsA = a.start_time.split(" ");
					const isoDateTimeA = `${dateTimePartsA[0]}T${dateTimePartsA[1]}Z`;

					const dateTimePartsB = b.start_time.split(" ");
					const isoDateTimeB = `${dateTimePartsB[0]}T${dateTimePartsB[1]}Z`;

					return new Date(isoDateTimeB) - new Date(isoDateTimeA);
				});

				const convertedData = data.map(game => {
					const dateTimeParts = game.start_time.split(" ");
					const isoDateTime = `${dateTimeParts[0]}T${dateTimeParts[1]}Z`;
					const startTimeInLocal = new Date(isoDateTime).toLocaleString();
					return { ...game, start_time: startTimeInLocal};
				});

				setGameHistoryData(convertedData);
			})
			.catch((error) => {
				console.log(error); 
			});
	};

	return (
		<div className={`gameHistoryContainer ${styles}`}>
			<div className="gameHistoryTitle">User History</div>
			{gameHistoryData.length === 0 ? (
				<p>No user history to show</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Game Name</th>
							<th>Start Time</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{gameHistoryData.map((game) => {
							return (
								<tr className="gameHistoryItem" key={game.game_history_id}>
									<td>{game.game_name}</td>
									<td>{game.start_time}</td>
									<td>{game.score}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default GameHistory;

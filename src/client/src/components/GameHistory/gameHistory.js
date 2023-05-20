import React, { useEffect, useState } from "react";
import "./styles.scss";
import { apiInstance } from "../../services/apiInstance";

const GameHistory = ({ styles, accessToken }) => {
	const [gameHistoryData, setGameHistoryData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const path = "/auth/user/gamehistory";

		await apiInstance
			.get(path, {
				headers: {
					"Authorization": `Bearer ${accessToken}`
				}
			})
			.then((res) => {
				const data = res.data;
				console.log(data);
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
				<tbody>
					{gameHistoryData.map((game) => {
						return (
							<tr className="gameHistoryItem" key={game.game_history_id}>
								<td className="item">{game.game_name}</td>
								<td className="detail">{`Start TIme: ${game.start_time}, End Time: ${game.end_time}`}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default GameHistory;

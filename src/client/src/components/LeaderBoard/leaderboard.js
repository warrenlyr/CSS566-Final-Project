import React, { useEffect, useState } from "react";
import "./styles.scss";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";
import { authApiInstance } from "../../services/authApiInstance";

const Leaderboard = ({ styles}) => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [refreshClicked, setRefreshClicked] = useState(false);

	useEffect(() => {
		fetchUserGameHistory()
			.then(gameId => {
				fetchData(gameId);
			});
	}, [refreshClicked]);

	const fetchUserGameHistory = async () => {
		const path = "/auth/user/gamehistory";
		let gameId;

		await authApiInstance
			.get(path)
			.then((res) => {
				const data = res.data;
				gameId = data[data.length - 1].game_id;
			})
			.catch((error) => {
				console.log(error); 
			});

		return (gameId);
	};

	const fetchData = async (gameId) => {
		const path = `/leaderboard/get/${gameId}`;

		await apiInstance
			.get(path)
			.then((res) => {
				const data = res.data.leaderboard;
				setLeaderboardData(data);
			})
			.catch((error) => {
				console.log(error); //change this
			});
	};

	return (
		<div className={`leaderboardContainer ${styles}`}>
			<div className="leaderboardheader">
				<div className="leaderboardTitle">Leaderboard</div>
				<Button
					additionalStyles={"leaderboardrefreshbutton"}
					type={"button"}
					handleClick={() => setRefreshClicked(!refreshClicked)}
				>
					Refresh
				</Button>
			</div>
			<table className="leaderboard">
				<tbody>
					{leaderboardData.map((el) => {
						return (
							<tr className="leaderboardRow" key={el.rank}>
								<td className="rankColumn"> {el.rank} </td>
								<td className="scoreColumn">
									<span className="username">{el.username}</span>{" "}
									<span>{el.score}</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;

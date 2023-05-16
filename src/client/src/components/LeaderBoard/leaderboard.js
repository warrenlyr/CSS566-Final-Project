import React, { useEffect, useState } from "react";
import "./styles.css";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";

const Leaderboard = ({ styles, type, level }) => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [refreshClicked, setRefreshClicked] = useState(false);

	useEffect(() => {
		fetchData();
	}, [refreshClicked]);

	const fetchData = async () => {
		let path = "";
		if (type === "todaysrewards") {
			path = "/leaderboards/todaysrewardgame";
		} else {
			path = `/game/level/${level}`;
		}
		await apiInstance
			.get(path)
			.then((res) => {
				const data = res.data.data;
				setLeaderboardData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={`leaderboardContainer ${styles}`}>
			<div className="leaderboardheader">
				<div className="leaderboardTitle">Leaderboard</div>
				<Button
					additionalStyles={"leaderboardrefreshbutton"}
					type={"buton"}
					handleClick={() => setRefreshClicked(!refreshClicked)}
				>
					Refresh
				</Button>
			</div>
			<table className="leaderboard">
				<tbody>
					{leaderboardData.map((el) => {
						return (
							<tr className="leaderboardRow" key={el.rank + 1}>
								<td className="rankColumn"> {el.rank + 1} </td>
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

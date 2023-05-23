import React, { useEffect, useState } from "react";
import "./styles.scss";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";

const Leaderboard = ({ styles, site, gameId=null }) => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [refreshClicked, setRefreshClicked] = useState(false);

	useEffect(() => {
		fetchData();
	}, [refreshClicked]);

	const fetchData = async () => {
		let path = "";
		if (site === "landingPage") {
			path = "/leaderboard/landingpage";
		} else {
			path = `/leaderboard/get/${gameId}`;
		}

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
			{leaderboardData.length !== 0 ? (
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
			) : (
				<div>No scores to show</div>
			)}
		</div>
	);
};

export default Leaderboard;

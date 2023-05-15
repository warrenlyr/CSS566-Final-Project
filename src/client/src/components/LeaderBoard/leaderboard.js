import React, { useState } from "react";
import "./styles.css";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";

const Leaderboardlanding = () => {
	const [rank, setRank] = useState(0);
	const [score, setScore] = useState(0);
	const [username, setUsername] = useState("Anonymous");

	const refreshbutton = () => {
		alert("Refresh button to be tested with the backend");
		apiInstance
			.get("/leaderboards/todaysrewardgame")
			.then((res) => {
				const data = res.data;
				setRank(data.rank);
				setScore(data.score);
				setUsername(data.username);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="Board">
			<table className="leaderboard ">
				<div className="leaderboardheader">
					<h2> Leaderboard </h2>
					<Button
						className="leaderboardrefreshbutton"
						handleClick={() => refreshbutton()}
					>
						{" "}
						Refresh{" "}
					</Button>
				</div>
				<col style={{ width: "10%" }} />
				<col style={{ width: "80%" }} />
				<col style={{ width: "10%" }} />
				<tbody>
					<tr>
						<td className="column-1"> {rank} </td>
						<td className="column-2"> {username} </td>
						<td className="column-3"> {score} </td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboardlanding;

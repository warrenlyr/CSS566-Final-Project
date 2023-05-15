import React, { Component } from "react";
import "./styles.css";
import Button from "../../components/Button/Button";
import Leaderboardlanding from "../../components/LeaderBoard/leaderboard";

export class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dummyHistory: [
				{
					name: "Last Login:",
					time: "XXX",
				},
				{
					name: "Highest Score:",
					time: "XXX",
				},
				{
					name: "Number of Sessions:",
					time: "XXX",
				},
				{
					name: "Average Login per Day:",
					time: "XXX",
				},
				{
					name: "Total Rewards Earned:",
					time: "XXX",
				},
				{
					name: "User's recent games:",
					time: "XXX",
				},
			],
		};
	}

	render() {
		return (
			<div className="Landing">
				<div className="pageTitle">"Word Game Name"</div>

				<div className="Board">
					<Leaderboardlanding />

					<h2 className="userHistory">User History</h2>
					<table className="table">
						<col style={{ width: "10%" }} />
						<col style={{ width: "80%" }} />
						<col style={{ width: "10%" }} />
						<tbody>
							{this.state.dummyHistory.map((el) => {
								return (
									<tr>
										<td className="border-0">{el.name}</td>
										<td className="border-0">{el.time}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<div className="gameButtons">
					<Button
						additionalStyles={"buttons"}
						buttonType={"button"}
						handleClick={() => alert("Level-Based Game")}
					>
						Level-Based Game
					</Button>

					<Button
						additionalStyles={"buttonsspecial"}
						buttonType={"button"}
						handleClick={() => alert("Today's Rewards Game")}
					>
						Today's Rewards Game
					</Button>

					<Button
						additionalStyles={"buttons"}
						buttonType={"button"}
						handleClick={() => alert("User Puzzle Design")}
					>
						User Puzzle Design
					</Button>
				</div>
			</div>
		);
	}
}

export default LandingPage;

import React, { Component } from "react";
import "./styles.css";
import Button from "../../components/Button/Button";
import { apiInstance } from "../../services/apiInstance";


export class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dummyplayers: [
				{
					name: "User A",
					time: "XX:XX",
				},
				{
					name: "User B",
					time: "XX:XX",
				},
				{
					name: "User C",
					time: "XX:XX",
				},
				{
					name: "User D",
					time: "XX:XX",
				},
				{
					name: "User E",
					time: "XX:XX",
				},
				{
					name: "User F",
					time: "XX:XX",
				},
				{
					name: "User G",
					time: "XX:XX",
				},
				{
					name: "User H",
					time: "XX:XX",
				},
				{
					name: "User I",
					time: "XX:XX",
				},
				{
					name: "User J",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
				{
					name: "Anonymous",
					time: "XX:XX",
				},
			],

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
			rank: '',
			score: '',
			username: '',
		};
	}

	refreshbutton = () => {
		alert("Refresh button to be tested with the backend");
		apiInstance
			.get("/leaderboards/todaysrewardgame")
			.then((res) => {
				const data = res.data;
				this.rank = data.rank;
				this.score = data.score;
				this.username = data.username;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="Landing">

				<h1>Landing Page</h1>
				<div className="Board">
						<table className="leaderboard ">
							<div className="leaderboardheader">
								< h2 > Leaderboard </h2>
								<Button 
									className="leaderboardrefreshbutton"
									handleClick={() => this.refreshbutton()}
								> Refresh </Button>
							</div>
							<col style={{ width: "20%" }} />
							<col style={{ width: "60%" }} />
							<col style={{ width: "20%" }} />
							<tbody>
								{this.state.dummyplayers.map((el, Rank) => {
									return (
										<tr>
											<td className="column-1"> {Rank + 1} </td>
											<td className="column-2"> {el.name} </td>
											<td className="column-3"> {el.time} </td>

											<td className="column-1"> {this.state.rank} </td>
											<td className="column-2"> {this.state.username} </td>
											<td className="column-3"> {this.state.score} </td>

										</tr>
									);
								})}
							</tbody>
						</table>
				
					<h2 className="userHistory">User History</h2>
					<table className="table">
						<col style={{width: "10%"}} />
						<col style={{width: "80%"}} />
						<col style={{width: "10%"}} />
						<tbody>
							{this.state.dummyHistory.map((el) => {
								return(
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

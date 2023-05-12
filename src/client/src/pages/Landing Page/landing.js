import React, { Component } from "react";
import "./styles.css";
import Button from "../../components/Button/Button";

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
			],
		};
	}

	render() {
		return (
			<div className="Landing">
				<h1>Landing Page</h1>
				<div className="Board">
					<h1 className="leaderboard"> Leaderboard</h1>
					<table className="table ">
						<col style={{ width: "10%" }} />
						<col style={{ width: "80%" }} />
						<col style={{ width: "10%" }} />
						<tbody>
							{this.state.dummyplayers.map((el, Rank) => {
								return (
									<tr>
										<td className="border-0"> {Rank + 1} </td>
										<td className="border-0"> {el.name} </td>
										<td className="border-0"> {el.time} </td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<div className="userhistory"></div>
				<div className="gameButtons">
					<Button
						additionalStyles={"buttons"}
						buttonType={"button"}
						handleClick={() => alert("Level-Based Game")}
					>
						Free Play
					</Button>
					<Button
						additionalStyles={"buttonsspecial"}
						buttonType={"button"}
						handleClick={() => alert("Today's Rewards Game")}
					>
						Daily Puzzle
					</Button>
					<Button
						additionalStyles={"buttons"}
						buttonType={"button"}
						handleClick={() => alert("User Puzzle Design")}
					>
						Customize Puzzle
					</Button>
				</div>
			</div>
		);
	}
}

export default LandingPage;

import React,{Component} from "react";
import "./styles.css";

export class LandingPage extends Component{

	constructor(props){
		super(props);
		this.state = {
			dummyplayers:[
				{
					name: "User A",
					time: "XX:XX",
				}, {
					name: "User B",
					time: "XX:XX",
				}, {
					name: "User C",
					time: "XX:XX",
				}, {
					name: "User D",
					time: "XX:XX",
				}, {
					name: "User E",
					time: "XX:XX",
				}, {
					name: "User F",
					time: "XX:XX",
				}, {
					name: "User G",
					time: "XX:XX",
				}, {
					name: "User H",
					time: "XX:XX",
				}, {
					name: "User I",
					time: "XX:XX",
				}, {
					name: "User J",
					time: "XX:XX",
				}
			]
		};
	}

	render(){
	return (
		<div className="Landing">
			<h1>Landing Page</h1>
			<div className="Board">
				<h1 className="leaderboard"> Leaderboard</h1>
				<table className="table ">
					<col style={{width:'10%'}}/>
					<col style={{width:'80%'}}/>
					<col style={{width:'10%'}}/>
					<tbody>
						{
							this.state.dummyplayers.map((el,Rank) => {
								return (
								<tr>
									< td className="border-0"> {Rank+1} </td>
									< td className="border-0"> {el.name} </td>
									< td className="border-0"> {el.time} </td>
								</tr>
								)
							})
						}
						
					</tbody>
				</table>
			</div>

			<div className="userhistory">

			</div>
			<button className="buttons" onClick={() => alert("Level-Based Game")}>
				Level-Based Game
			</button>
			<button className="buttonsspecial" onClick={() => alert("Today's Rewards Game")}>
				Today's Rewards Game
			</button>
			<button className="buttons" onClick={() => alert("User Puzzle Design")}>
				User Puzzle Design
			</button>
		</div>
	);
	}
};

export default LandingPage;

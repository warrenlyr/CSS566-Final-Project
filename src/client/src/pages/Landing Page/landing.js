import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Button from "../../components/Button/Button";
import Leaderboard from "../../components/LeaderBoard/leaderboard";
import GameHistory from "../../components/GameHistory/gameHistory";

const LandingPage = () => {
	return (
		<>
			<div className="pageTitle">Husky seeks Kitty</div>
			<div className="landingContainer">
				<Leaderboard
					styles={"landingLeaderboard"}
					site={"landingPage"}
				/>
				<GameHistory />
			</div>
			<div className="gameButtons">
				<Link to="/game/normalpuzzle">
					<Button additionalStyles={"buttons"} buttonType={"button"}>
						Normal Puzzle
					</Button>
				</Link>
				<Link to="/game/dailypuzzle">
					<Button additionalStyles={"buttonsspecial"} buttonType={"button"}>
						Daily Puzzle
					</Button>
				</Link>
				<Link to="/game/designpuzzle">
					<Button additionalStyles={"buttons"} buttonType={"button"}>
						Design Puzzle
					</Button>
				</Link>
			</div>
		</>
	);
};



export default LandingPage;

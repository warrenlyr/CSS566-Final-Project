import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Button from "../../components/Button/Button";
import Leaderboard from "../../components/LeaderBoard/leaderboard";
import GameHistory from "../../components/Game History/gameHistory";

const LandingPage = () => {
	return (
		<>
			<div className="pageTitle">Word Game Name</div>
			<div className="landingContainer">
				<Leaderboard
					styles={"landingLeaderboard"}
					type={"todaysrewards"}
					level={2}
				/>
				<GameHistory />
			</div>
			<div className="gameButtons">
				<Link to="/game/normalgame">
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

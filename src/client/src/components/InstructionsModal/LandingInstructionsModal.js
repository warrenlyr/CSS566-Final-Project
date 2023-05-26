import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const LandingInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay"/>
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<h1>Welcome to our<br></br>Word Search Game!</h1>
				<p> This game has three game modes:</p>

				<p className="modal-section-header">Normal Puzzle</p>
				<p className="model-section-text">
					This mode has three different difficulty levels.<br></br>
					<u>Level 1</u> has a 5x5 grid and up to 3 words to be found,<br></br>
					<u>level 2</u> has a 7x7 grid and up to 5 words to be found,<br></br>
					<u>Level 3</u> has a 10x10 grid and up to 7 words to be found.
				</p>

				<p className="modal-section-header">Daily Puzzle</p>
				<p className="model-section-text">
					This mode is set to difficulty level 2 and has a new puzzle every day.<br></br>
					You can play the game, earn reward points, and see your score on the leaderboard 
					shown on the left side of this landing page.
				</p>

				<p className="modal-section-header">Design Puzzle</p>
				<p className="model-section-text">
					You can design your own puzzle and save it to our database so that 
					other others can play it in the future.
				</p>

				<p className="modal-section-header">Share Scores</p>
				<p className="model-section-text">
					You can share your scores to the leaderboard in normal puzzle and daily puzzle modes
					either by username (only if you&#39;are logged in) or anonymously.
				</p>

				<div className="modal-header">
					<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">Got it!</span>
					</button>
				</div>
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default LandingInstructionsModal;
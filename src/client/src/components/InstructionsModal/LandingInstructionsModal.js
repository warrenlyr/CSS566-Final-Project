import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const LandingInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay"/>
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				< h1 > Welcome to the Landing Page of the Game! </h1>
				<p> This game has three game modes:</p>
				<ul>
					<li>Normal Puzzle: <p> This mode is used to play games on different levels as level 1: 5x5 grid. level 2: 7x7 grid, and level 3: 10x10 grid.</p></li>
					<li>Daily Puzzle: <p>This game updates daily and users can play a new game everyday.</p></li>
					<li>Design Puzzle: <p>In this mode, users can create their own game grid and send it to our database so that users could play this game in future.</p></li>
				</ul>
				<div className="modal-header">
					<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default LandingInstructionsModal;
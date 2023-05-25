import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const NormalInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay"/>
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				< h1 > Welcome to the Normal Puzzle Page! </h1>
				<p>The instructions for the game are as follows:</p>
				<ol>
					<li>Select the Level from the dropdown as level 1:5x5 grid, level 2:7x7 grid, or level 3:10x10 grid.</li>
					<li>Select the grid indexes to find letters which match the words in the words-list in the correct order.</li>
					<li>When all the words are found, click on Confirm to submit your score which will be calculated based on the time taken to solve the grid.</li>
					<li>Click the Open Leaderboard button to see the level`s leaderboard by clicking on the refresh button.</li>
					<li>Click the Clear button to clear all the selections from the grid.</li>
				</ol>
				<div className="modal-header">
					<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default NormalInstructionsModal;
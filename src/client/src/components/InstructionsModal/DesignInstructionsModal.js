import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const DesignInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay"/>
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				< h1 > Welcome to the Design Puzzle Page! </h1>
				<p>The instructions for the game are as follows:</p>
				<ol>
					<li>Select the Level from the dropdown as level 1:5x5 grid, level 2:7x7 grid, or level 3:10x10 grid.</li>
					<li>Users will enter comma-separated single words in a text input field(e.g.cat, dog, fish.Validation for no blank exists within commas is needed here). </li>
					<li>Click on the Confirm button to submit the input text and level information along with the generated grid puzzle to the backend.</li>
					<li>If the user is not satisfied with the generated puzzle, then they can either click the Regenerate button again or modify the input text and level, then click the Confirm button again to submit their updated design.</li>
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

export default DesignInstructionsModal;
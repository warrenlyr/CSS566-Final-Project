import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const DesignInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay" />
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<h1>Instruction of<br></br> Design Puzzle</h1>
				<ol>
					<li className="instruction">
						Select the difficulty level from the dropdown.
						(Level 1 has a 5x5 grid and can have up to 3 words to be found,
						level 2 has a 7x7 grid and can have up to 5 words to be found,
						level 3 has a 10x10 grid and can have up to 7 words to be found.)
					</li>
					<li className="instruction">
						You can enter up to N words 
						(N is the maximum number of words for the selected level) in the input text box.
						Words should be separated by spaces. e.g. &quot;dog cat pig&quot;
					</li>
					<li className="instruction">
						Click on the Generate button.
						You&apos;ll see a grid with the letters of the words you entered 
						(may not contain all words because sometimes not all word can have a seat).
					</li>
					<li className="instruction">
						If you are satisfied with the grid, click on the Confirm button to save the puzzle
						and other players can play it.
					</li>
					<li className="instruction">
						If you are not satisfied with the grid, click on the Refresh button to generate a new grid.
					</li>
				</ol>
				<div className="modal-header">
					<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">Got it!</span>
					</button>
				</div>
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default DesignInstructionsModal;
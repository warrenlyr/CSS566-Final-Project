import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const DailyInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay" />
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<h1>Instruction of<br></br> Daily Puzzle</h1>

				<ol>
					<li className="instruction">
						This mode is set to be equal to difficulty level 2 and has a new puzzle every day.
						You can only play this puzzle once a day (if you&#39;ve logged in).
					</li>
					<li className="instruction">
						Select the grid indexes and click on the confirm button to unhidden the indexes.
						If the letters in thoes indexes form a word in the word list,
						the indexes will not be hidden again and you&#39;ve found a word!
						If not, the indexes will be hidden again.
					</li>
					<li className="instruction">
						You can also clear your selection by clicking on the clear button or
						clicking on the selected indexes.
					</li>
					<li className="instruction">
						When all the words are found, the game is over and you can see your score.
					</li>
					<li className="instruction">
						When the game is over, you&#39;ll have the option to share your score to the leaderboard
						either by username (if you&#39;ve logged in) or anonymously.
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

export default DailyInstructionsModal;
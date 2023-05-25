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
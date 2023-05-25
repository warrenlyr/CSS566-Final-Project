import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const DailyInstructionsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
	<React.Fragment>
		<div className="modal-overlay"/>
		<div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
			<div className="modal">
				<div className="modal-header">
					< h1 > Hello, Im a modal. </h1>
					<button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				
			</div>
		</div>
	</React.Fragment>, document.body
) : null;

export default DailyInstructionsModal;
import React, { useEffect, useState } from "react";

const Timer = ({ stopTimer }) => {
	const [isActive, setIsActive] = useState(true);
	const [time, setTime] = useState(0);

	useEffect(() => {
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setTime((time) => time + 1000);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive]);

	useEffect(() => {
		if (stopTimer) {
			handleStop();
		}
	}, [stopTimer]);

	const handleStop = () => {
		setIsActive(false);
	};

	return (
		<>
			<span className="digits">
				{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
			</span>
			<span className="digits">
				{("0" + Math.floor((time / 1000) % 60)).slice(-2)}
			</span>
		</>
	);
};

export default Timer;

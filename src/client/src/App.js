import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [getMessage, setGetMessage] = useState({});
	const [userName, setUserName] = useState("");
	const [passWord, setPassWord] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:5000/")
			.then((response) => {
				console.log("SUCCESS", response);
				setGetMessage(response);
			})
			.catch((error) => {
				console.log("not working", error);
			});
	}, []);

	let handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = {
				username: userName,
				password: passWord,
			};
			axios
				.post("http://localhost:5000/login", userData)
				.then((res) => console.log(res));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>React + Flask Tutorial</p>
				<div>
					{getMessage.status === 200 ? (
						<h3>{getMessage.data}</h3>
					) : (
						<h3>LOADING</h3>
					)}
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={userName}
						placeholder="username"
						onChange={(e) => setUserName(e.target.value)}
					/>
					<input
						type="text"
						value={passWord}
						placeholder="password"
						onChange={(e) => setPassWord(e.target.value)}
					/>
					<button type="submit">Log In</button>
				</form>
			</header>
		</div>
	);
}

export default App;

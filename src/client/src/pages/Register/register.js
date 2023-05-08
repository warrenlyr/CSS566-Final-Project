import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { apiInstance } from "../../services/apiInstance";

const Register = () => {
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const navigate = useNavigate();

	const handleRegister = (e) => {
		const data = {
			username: username,
			password: pass,
		};
		apiInstance
			.post("/auth/register", data)
			.then((res) => {
				console.log(res);
				// add toast
				setTimeout(() => {
					navigate("/");
				}, 5000);
			})
			.catch((error) => {
				console.log(error);
			});

		setUsername("");
		setPass("");
		e.preventDefault();
	};
	return (
		<>
			<div className="title">Register</div>
			<form onSubmit={handleRegister} className="registerForm">
				<label htmlFor="username" className="registerLabel">
					username
				</label>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					className="registerInput"
				/>
				<label htmlFor="password" className="registerLabel">
					password
				</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					className="registerInput"
				/>
				<button type="submit" className="defaultButton registerButton">
					REGISTER
				</button>
			</form>
		</>
	);
};

export default Register;

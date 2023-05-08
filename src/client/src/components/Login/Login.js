import { React, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Login = (onClose) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			type: "log in",
			email: email,
			password: pass,
		};
		console.log(data);
	};

	return (
		<>
			<div className="modalTitle">Sign in</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email" className="formLabel">
					email
				</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					className="formInput"
				/>
				<label htmlFor="password" className="formLabel">
					password
				</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					className="formInput"
				/>
				<Link to={"./forgot"} onClick={onClose} className="forgotLink">
					Forgot Password?
				</Link>
				<button type="submit" className="defaultButton formButton">
					SIGN IN
				</button>
			</form>
			<hr className="lineBreak" />
			<div className="register">
				Not a member?{" "}
				<Link to={"./register"} onClick={onClose}>
					Sign Up
				</Link>
			</div>
		</>
	);
};

export default Login;

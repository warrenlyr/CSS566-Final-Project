import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/Landing Page/landing";
import GamePage from "./pages/Today's Rewards Game/game";
import CustomizePage from "./pages/User Puzzle Design/customize";
import NotFound from "./pages/notFound";
import Register from "./pages/register";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route path="/game" element={<GamePage />} />
				<Route path="/customize" element={<CustomizePage />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

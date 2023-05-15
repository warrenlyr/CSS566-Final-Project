import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/Landing Page/landing";
import DailyPuzzle from "./pages/Daily Puzzle/dailyPuzzle";
import CustomizePage from "./pages/Design Puzzle/customize";
import NotFound from "./pages/notFound";
import Register from "./pages/Register Page/register";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route path="/game/dailypuzzle" element={<DailyPuzzle />} />
				<Route path="/game/designpuzzle" element={<CustomizePage />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

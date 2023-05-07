import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/landing";
import GamePage from "./pages/game";
import CustomizePage from "./pages/customize";
import NotFound from "./pages/notFound";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<LandingPage />} />
				<Route path="/game" element={<GamePage />} />
				<Route path="/customize" element={<CustomizePage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

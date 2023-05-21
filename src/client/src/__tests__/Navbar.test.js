import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "@testing-library/jest-dom/extend-expect";


describe("Navbar Component", () => {
	it("renders without crashing", () => {
		const { container } = render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		expect(container).toBeInTheDocument();
	});

	it("renders the logo", () => {
		const { getByAltText } = render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		const logo = getByAltText("logo");
		expect(logo).toBeInTheDocument();
	});

	it("renders the login button", () => {
		const { getByText } = render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		const loginButton = getByText("Log in");
		expect(loginButton).toBeInTheDocument();
	});

	it("shows an alert when the login button is clicked", () => {
		const { getByText } = render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		const loginButton = getByText("Log in");
		window.alert = jest.fn();
		fireEvent.click(loginButton);
		expect(window.alert).toHaveBeenCalledWith("hello");
	});
});

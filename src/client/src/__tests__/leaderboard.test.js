import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeaderBoard from '../components/LeaderBoard/leaderboard';
import { apiInstance } from '../services/apiInstance';
jest.mock('../services/apiInstance');

const mockData = {
  leaderboard: [
    { rank: 1, username: 'User 1', score: 100 },
    { rank: 2, username: 'User 2', score: 200 },
    // more mock data...
  ],
};

describe('Leaderboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test: Fetches data from the server and displays the leaderboard
  it('fetches data from the server and displays the leaderboard', async () => {
    // Mock the API response
    apiInstance.get.mockResolvedValue({ data: mockData });

    // Render the LeaderBoard component
    render(<LeaderBoard site="landingPage" />);

    // Wait for the "Leaderboard" text to be displayed
    await waitFor(() => screen.getByText('Leaderboard'));

    // Assertions: Check if the leaderboard data is displayed correctly
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
    // Add more assertions based on your mock data and component structure...
  });

  // Test: Fetches data when the refresh button is clicked
  it('fetches data when the refresh button is clicked', async () => {
    // Mock the API response
    apiInstance.get.mockResolvedValue({ data: mockData });

    // Render the LeaderBoard component
    render(<LeaderBoard site="landingPage" />);

    // Simulate a click on the "Refresh" button
    userEvent.click(screen.getByText('Refresh'));

    // Wait for the API call to be made
    await waitFor(() => {
      // Assertions: Check if the API was called with the correct endpoint
      expect(apiInstance.get).toHaveBeenCalledTimes(2);
      expect(apiInstance.get).toHaveBeenCalledWith('/leaderboard/landingpage');
    });
  });

  // Test: Shows "No scores to show" when there is no leaderboard data
  it('shows "No scores to show" when there is no leaderboard data', async () => {
    // Mock the API response with an empty leaderboard array
    apiInstance.get.mockResolvedValue({ data: { leaderboard: [] }});

    // Render the LeaderBoard component
    render(<LeaderBoard site="landingPage" />);

    // Wait for the "Leaderboard" text to be displayed
    await waitFor(() => screen.getByText('Leaderboard'));

    // Assertion: Check if the "No scores to show" message is displayed
    expect(screen.getByText('No scores to show')).toBeInTheDocument();
  });

  // Add more tests...
});

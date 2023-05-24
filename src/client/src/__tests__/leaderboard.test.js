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

  it('fetches data from the server and displays the leaderboard', async () => {
    apiInstance.get.mockResolvedValue({ data: mockData });

    render(<LeaderBoard site="landingPage" />);
    await waitFor(() => screen.getByText('Leaderboard'));

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
    // add more assertions based on your mock data and component structure...
  });

  it('fetches data when the refresh button is clicked', async () => {
    apiInstance.get.mockResolvedValue({ data: mockData });

    render(<LeaderBoard site="landingPage" />);
    userEvent.click(screen.getByText('Refresh'));

    await waitFor(() => {
      expect(apiInstance.get).toHaveBeenCalledTimes(2);
      expect(apiInstance.get).toHaveBeenCalledWith('/leaderboard/landingpage');
    });
  });

  it('shows "No scores to show" when there is no leaderboard data', async () => {
    apiInstance.get.mockResolvedValue({ data: { leaderboard: [] }});

    render(<LeaderBoard site="landingPage" />);
    await waitFor(() => screen.getByText('Leaderboard'));

    expect(screen.getByText('No scores to show')).toBeInTheDocument();
  });

  // more tests...
});

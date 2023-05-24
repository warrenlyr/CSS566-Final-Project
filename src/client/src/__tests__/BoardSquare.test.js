import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import BoardSquare from 'D:/CSS566-Final-Project/src/client/src/components/BoardSquare/BoardSquare.js';

describe('BoardSquare', () => {
  let mockHandleClick;

  beforeEach(() => {
    mockHandleClick = jest.fn();
  });

  // This will run after each test in this describe block, ensuring that the DOM is cleaned up for the next test.
  afterEach(() => {
    cleanup();
  });

  test('renders without crashing', () => {
    const { container } = render(
      <BoardSquare
        letter="A"
        row={0}
        col={0}
        handleClick={mockHandleClick}
        clicked={false}
        opened={false}
        level={1}
      />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test('invokes handleClick on click', () => {
    const { getByRole } = render(
      <BoardSquare
        letter="A"
        row={0}
        col={0}
        handleClick={mockHandleClick}
        clicked={false}
        opened={false}
        level={1}
      />,
    );

    fireEvent.click(getByRole('button'));
    expect(mockHandleClick).toHaveBeenCalledWith(0, 0, 'A');
  });

  describe('when clicked and opened', () => {
    test('assigns correct classes', () => {
      const { getByRole } = render(
        <BoardSquare
          letter="A"
          row={0}
          col={0}
          handleClick={mockHandleClick}
          clicked={true}
          opened={true}
          level={1}
        />,
      );
      expect(getByRole('button')).toHaveClass('square squareClicked squareOpened one');
    });
  });

  describe('when opened but not clicked', () => {
    test('assigns correct classes', () => {
      const { getByRole } = render(
        <BoardSquare
          letter="A"
          row={0}
          col={0}
          handleClick={mockHandleClick}
          clicked={false}
          opened={true}
          level={2}
        />,
      );
      expect(getByRole('button')).toHaveClass('square squareOpened two');
    });
  });

  describe('when neither opened nor clicked', () => {
    test('assigns correct classes', () => {
      const { getByRole } = render(
        <BoardSquare
          letter="A"
          row={0}
          col={0}
          handleClick={mockHandleClick}
          clicked={false}
          opened={false}
          level={3}
        />,
      );
      expect(getByRole('button')).toHaveClass('square three');
    });
  });
});

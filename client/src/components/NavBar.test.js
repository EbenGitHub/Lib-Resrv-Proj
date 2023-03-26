import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../utils/utils-for-tests'
import NavBar from './NavBar'

describe.only('<NavBar />', () => {

  test('Navigation Bar is rendered correctly', () => {
    renderWithProviders(<NavBar />)

    const elementOne = screen.getByText(/Home/i);
    const elementTwo = screen.getByText(/Books/i);
    const elementThree = screen.getByText(/Login/i);
    const elementFour = screen.getByText(/Signup/i);
    const elementFive = screen.getByText(/Contact/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
    expect(elementThree).toBeInTheDocument();
    expect(elementFour).toBeInTheDocument();
    expect(elementFive).toBeInTheDocument();
  })

})
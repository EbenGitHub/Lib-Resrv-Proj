import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import SignUp from './SignUp'
import { renderWithProviders } from '../utils/utils-for-tests'

describe('<SignUp />', () => {

  test('Signup form is rendered correctly', () => {
    renderWithProviders(<SignUp />)

    const linkElement = screen.getByText(/Register/i);
    expect(linkElement).toBeInTheDocument();

    const elementOne = screen.getByText(/Choose username/i);
    const elementTwo = screen.getByText(/Input Email address/i);
    const elementThree = screen.getByText(/Profession/i);
    const elementFour = screen.getByText(/^Password/i);
    const elementFive = screen.getByText(/^Confirm Password/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
    expect(elementThree).toBeInTheDocument();
    expect(elementFour).toBeInTheDocument();
    expect(elementFive).toBeInTheDocument();
  })

})
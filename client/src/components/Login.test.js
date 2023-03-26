import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import LogIn from './LogIn'
import { renderWithProviders } from '../utils/utils-for-tests'

describe.only('<LogIn />', () => {

  test('Login form is rendered correctly', () => {
    renderWithProviders(<LogIn />)

    const linkElement = screen.getByText(/Sign in/i);
    expect(linkElement).toBeInTheDocument();

    const elementOne = screen.getByText(/Username/i);
    const elementTwo = screen.getByText(/Password/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
  })

})
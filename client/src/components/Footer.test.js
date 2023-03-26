import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import Footer from './Footer'
import { renderWithProviders } from '../utils/utils-for-tests'

describe('<Footer />', () => {

  test("renders logo in App component", () => {
    renderWithProviders(<Footer />);
    let elementOne = screen.getByText(/Copyright reserverd with MIT License/i)
    let elementTwo = screen.getByText(/ALX-Holberton 2023. Ebenezer Eshetie./i)
    
    expect(elementOne).toBeDefined()
    expect(elementTwo).toBeDefined()
  });

})
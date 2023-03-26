import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../utils/utils-for-tests'
import Tour from './Tour'

describe('<Tour />', () => {

  test('Navigation Bar is rendered correctly', () => {
    renderWithProviders(<Tour />)

    const elementOne = screen.getByText(/I am Waiting for you to log in/i);

    expect(elementOne).toBeInTheDocument();
  })

})
import '@testing-library/jest-dom/extend-expect'
import { screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { renderAuthUserWithProviders } from '../utils/utils-for-tests'
import Notify from './Notify'

describe('<Notify />', () => {

  test('Navigation Bar is rendered correctly when user authenticate', () => {
    renderAuthUserWithProviders(<Notify />)

    const elementOne = screen.getByText(/this is test Notification/i);

    expect(elementOne).toBeInTheDocument();
  })

  test('Notification can be deleted when cancel button clicked', () => {
    renderAuthUserWithProviders(<Notify />)

    fireEvent.click(screen.getByText('X'))

    const elementOne = screen.queryByText(/this is test Notification/i);

    expect(elementOne).not.toBeInTheDocument();
  })

})
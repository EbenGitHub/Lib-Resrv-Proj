import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../utils/utils-for-tests'
import Verify from './Verify'

describe.only('<Verify />', () => {

    const form = {
        username: "test", 
        password: "secret",
        profession: "Student", 
        email: "test@jest.react"
    }

  test('Navigation Bar is rendered correctly', () => {
    renderWithProviders(<Verify form={form} />)

    const elementOne = screen.getByText(RegExp(form.email));
    const elementTwo = screen.getByText(/A verification pin was sent to /i);
    const elementThree = screen.getByText(/Please verify your account!/i);
    const elementFour = screen.getByText(/If you could not find it, don't be shy to press Resend button./i);
    const elementFive = screen.getByPlaceholderText(/Enter your Pin here/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
    expect(elementThree).toBeInTheDocument();
    expect(elementFour).toBeInTheDocument();
    expect(elementFive).toBeInTheDocument();
  })

})
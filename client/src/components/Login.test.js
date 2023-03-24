import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import LogIn from './LogIn'

describe.only('<LogIn />', () => {
  let mockHandler = jest.fn()

  beforeEach(() => {
    render(<LogIn />) //eslint-disable-line
  })

  test('Login form is submitted with the right content', () => {
    const user = userEvent

    const userInput = screen.getAllByRole('textbox')
    user.type(userInput[0], 'Jest is Here')
    user.type(userInput[1], 'secretpass')

    const submit = screen.getByText('Log In')

    expect(submit).toBeDefined()
  })
})
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import SignUp from './SignUp'
import store from '../store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

describe.only('<SignUp />', () => {
    let container
  let mockHandler = jest.fn()

  beforeEach(() => {
    container = render(<Router><Provider store={store}><SignUp setForm={mockHandler}/></Provider></Router>).container //eslint-disable-line
  })

  test('SignUp form is submitted with the right content', () => {
    const user = userEvent

    const usernameInput = container.querySelector('#username')
    const emailInput = container.querySelector('#email')
    const passInput = container.querySelector('#password')
    const passConfInput = container.querySelector('#passwordcnf')

    user.type(usernameInput, 'Jest is Here')
    user.type(emailInput, 'test@jest.react')
    user.type(passInput, 'testReact@#1234')
    user.type(passConfInput, 'testReact@#1234')

    const submit = screen.getByText('Sign Up')
    user.click(submit)

    expect(mockHandler.mock.calls).toHaveLength(1)

    const response = mockHandler.mock.calls[0][0]

    expect(response.username).toBe('Jest is Her')
    expect(response.profession).toBe('Student')
    expect(response.email).toBe('test@jest.react')
    expect(response.password).toBe('testReact1234')
  })
})
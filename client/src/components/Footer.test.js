import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
    
  test('footer is rendered', () => {
    beforeAll(() => {
      render(<Footer />) //eslint-disable-this
    })

    
    let elementOne = screen.getByText('Copyright reserverd with MIT License')
    let elementTwo = screen.getByText('ALX-Holberton 2023. Ebenezer Eshetie.')
    screen.debug(elementOne, elementTwo)
    expect(elementOne).toBeDefined()
    expect(elementTwo).toBeDefined()
  })
})
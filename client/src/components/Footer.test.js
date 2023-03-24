import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
    
  test('footer is rendered', () => {
    render(<Footer />)

    let element = screen.getByText('© Copyright reserverd with MIT License. ALX-Holberton 2023. Ebenezer Eshetie.')
    expect(element).toBeDefined()
  })
})
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../utils/utils-for-tests'
import BookDetail from './Book/BookDetail'
import { books } from '../utils/utils-for-tests'

describe.only('<Books />', () => {

  test('Book form is rendered correctly', () => {
    renderWithProviders(<BookDetail books={books} noHistory />)

    const elementOne = screen.getByText(RegExp(books[0].title));
    const elementTwo = screen.getByText(RegExp(books[1].title));

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
  })

  test('Book form is rendered correctly with history', () => {
    renderWithProviders(<BookDetail books={books} />)

    const elementOne = screen.getByText(RegExp(books[1].reservationHistory[0]));

    expect(elementOne).toBeInTheDocument();
  })

  test('Single book is rendered', () => {
    renderWithProviders(<BookDetail book={books[1]} />)

    const elementTwo = screen.getByText(RegExp(books[1].reservationHistory[0]));

    expect(elementTwo).toBeInTheDocument();
  })

})
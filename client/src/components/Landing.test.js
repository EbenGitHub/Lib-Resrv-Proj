import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../utils/utils-for-tests'
import Landing from './Landing'

describe.only('<Landing />', () => {

  test('Landing page is rendered correctly in English', () => {
    renderWithProviders(<Landing />)

    const elementOne = screen.getByText(/Reserve a book at your finger tip/i);
    const elementTwo = screen.getByText(/Don't go to a library doubting if the book you want will be available/i);
    const elementThree = screen.getByText(/Reserve a book at your home and pick it when you are available/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
    expect(elementThree).toBeInTheDocument();
  })

  test('Landing page is rendered correctly in Amharic', () => {
    renderWithProviders(<Landing />)

    const elementOne = screen.getByText(/የሚፈልጉትን መጽሃፍት በእጆ ካለው ስልክ ሪዘርቭ ያድርጉ/i);
    const elementTwo = screen.getByText(/የትም መሄድ ሳይጠበቅቦት እዛው ባሉበት ለማንበብ መጽሃፎን በተጠባባቂ ያስቀምጡ/i);
    const elementThree = screen.getByText(/ታዲያ ምን ይተብቃሉ። እዚህ ጋ ያለውን መስፈንጠሪያ በመንካት አሁኑኑ መጽሃፎን ረዘርቭ ያድርጉ/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
    expect(elementThree).toBeInTheDocument();
  })

  test('Call for action is rendered correctly', () => {
    renderWithProviders(<Landing />)

    const elementOne = screen.getByText(/Sign Up today./i);

    expect(elementOne).toBeInTheDocument();
  })


})
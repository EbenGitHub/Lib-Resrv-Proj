import '@testing-library/jest-dom/extend-expect'
import { screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { 
    renderWithProviders, 
    renderAuthUserWithProviders } from '../utils/utils-for-tests'
import Tour from './Tour'

describe('<Tour />', () => {

  test('Navigation Bar is rendered correctly', () => {
    renderWithProviders(<Tour />)

    const elementOne = screen.getByText(/I am Waiting for you to log in/i);

    expect(elementOne).toBeInTheDocument();
  })

  test('Navigation Bar is rendered correctly when user authenticate', () => {
    renderAuthUserWithProviders(<Tour />)

    const elementOne = screen.getByText(/Great! Hi .. I am/i);
    const elementTwo = screen.getByText(/በውቀቱ/i);
    const elementThree = screen.getByText(/Your AI Library tour Guid! I will give you a tour on how to use the app!/i);

    expect(elementOne).toBeInTheDocument();
    expect(elementTwo).toBeInTheDocument();
    expect(elementThree).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Next'))

    const elementFour = screen.getByText(/First, feel free and let me see you navigate around./i);
    const elementFive = screen.getByText(/You can go ahead and see/i);
    const elementSix = screen.getByText(/Even If you sign out, I will be waiting for you here. Click next if you explored around./i);

    expect(elementFour).toBeInTheDocument();
    expect(elementFive).toBeInTheDocument();
    expect(elementSix).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementSeven = screen.getByText(/Here at/i);
    const elementEight = screen.getByText(/You can see the books availability, reserve books, or cancel your book reservation/i);

    expect(elementSeven).toBeInTheDocument();
    expect(elementEight).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementNine = screen.getByText(/Available/i);
    const elementTen = screen.getByText(/, Means the book is availability and you can reserve it./i);

    expect(elementNine).toBeInTheDocument();
    expect(elementTen).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementEleven = screen.getByText(/Let me see you reserve one book./i);
    const elementTwelve = screen.getByText(/, Means you have successfully reserved the book, and you have/i);

    expect(elementEleven).toBeInTheDocument();
    expect(elementTwelve).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementThirteen = screen.getByText(/Not available/i);
    const elementFourteen = screen.getByText(/, Means someone else reserved the book, and you can not reserve it until it is released./i);

    expect(elementThirteen).toBeInTheDocument();
    expect(elementFourteen).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementFifteen = screen.getByText(/Try to reserve few books. I enjoy wathing you./i);

    expect(elementFifteen).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementSixteen = screen.getByText(/Here at/i);
    const elementSeventeen = screen.getByText(/My Reservations/i);
    const elementEighteen = screen.getByText(/, You can see the books you reserved with your reservation history/i);

    expect(elementSixteen).toBeInTheDocument();
    expect(elementSeventeen).toBeInTheDocument();
    expect(elementEighteen).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'))

    const elementNineteen = screen.getByText(/That was pretty much it!/i);
    const elementTwenty = screen.getByText(/Thank you for letting me show you around. You can go ahead and explore it for yourself./i);
    const elementTwentyone = screen.getByText(/Choi/i);

    expect(elementNineteen).toBeInTheDocument();
    expect(elementTwenty).toBeInTheDocument();
    expect(elementTwentyone).toBeInTheDocument();
  })

})
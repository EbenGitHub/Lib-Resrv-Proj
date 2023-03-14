import { gql } from "@apollo/client";

export const BOOKS = gql`
fragment Books on Book {
    title
      reservedDate
      reserved
      author
      reservedBy {
        id
      }
      reservationHistory
      id
      available
      expired {
        expiryDate
        isExpired
        timeFormate
      }
  }
`

export const MY_BOOKS = gql`
fragment MyBooks on Book {
  title
    reservedDate
    author
    catagory
    reservationHistory
    reserved
    id
    available
    expired {
      expiryDate
      isExpired
      timeFormate
    }
}

`

export const USERS = gql`
fragment Users on User {
    username
      id
      reservedBookCounts
      reservedBooks {
        ...Books
      }
  }

${BOOKS}
`

export const ME_FRAG = gql`
fragment Me on User {
  username
    id
    reservedBookCounts
    reservedBooks {
      ...MyBooks
    }
}

${MY_BOOKS}
`
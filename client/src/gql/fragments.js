import { gql } from "@apollo/client";

export const BOOKS = gql`
fragment Books on Book {
    title
      reservedDate
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
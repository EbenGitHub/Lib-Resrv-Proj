import { gql } from "@apollo/client";

export const BOOK_RESERVED = gql`
subscription {
    bookReserved {
      id
      title
      reservedBy {
        username
      }
    }
  }
`

export const BOOK_RELEASED = gql`
subscription {
    bookReleased {
      id
    }
  }
`
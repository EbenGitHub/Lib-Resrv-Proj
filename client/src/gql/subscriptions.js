import { gql } from "@apollo/client";

export const BOOK_RESERVED = gql`
subscription {
    bookReserved {
      id
      reservedDate
      author
      reserved
      available
      title
      reservedBy {
        username
        id
      }
    }
  }
`

export const BOOK_RELEASED = gql`
subscription {
    bookReleased {
      id
      reservedDate
      author
      reserved
      available
      title
      reservedBy {
        username
        id
      }
    }
  }
`
import { gql } from "@apollo/client";
import { BOOKS, ME_FRAG, MY_BOOKS } from "./fragments";

export const ALL_BOOKS = gql`
query($title: String) {
    books(title: $title) {
        ...Books
    }
}

${BOOKS}
`

export const BOOK = gql`
query($id: ID!) {
  book(id: $id) {
    ...MyBooks
  }
}

${MY_BOOKS}
`

export const ME = gql`
query {
    me {
      ...Me
    }
  }

${ME_FRAG}
`

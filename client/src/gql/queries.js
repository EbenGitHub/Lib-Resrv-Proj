import { gql } from "@apollo/client";
import { BOOKS, ME_FRAG } from "./fragments";

export const ALL_BOOKS = gql`
query {
    books {
        ...Books
    }
}

${BOOKS}
`

export const ME = gql`
query {
    me {
      ...Me
    }
  }

${ME_FRAG}
`


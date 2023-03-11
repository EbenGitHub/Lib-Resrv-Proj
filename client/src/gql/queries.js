import { gql } from "@apollo/client";
import { BOOKS, USERS } from "./fragments";

export const ALL_BOOKS = gql`
query books($title: String){
    books(title: $title)  {
        ...Books
    }
}

${BOOKS}
`

export const ME = gql`
query {
    me {
      ...Users
    }
  }

${USERS}
`


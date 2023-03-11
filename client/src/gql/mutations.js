import { gql } from "@apollo/client";

export const RESERVE_BOOK = gql`
mutation($reserveBookId: ID!) {
    reserveBook(id: $reserveBookId)
  }
`

export const RELEASE_BOOK = gql`
mutation($reserveBookId: ID!) {
    releaseBook(id: $reserveBookId)
  }
`

export const CREATE_USER = gql`
mutation($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`

export const LOGIN = gql`
mutation($loginUsername3: String!, $loginPassword2: String!) {
    login(username: $loginUsername3, password: $loginPassword2) {
      value
    }
  }
`
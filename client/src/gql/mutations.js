import { gql } from "@apollo/client";

export const RESERVE_BOOK = gql`
mutation($id: ID!) {
    reserveBook(id: $id) {
      id
    title
    reservedDate
    reserved
    reservationHistory
    available
    expired {
      expiryDate
      isExpired
      timeFormate
    }
    reservedBy {
      id
    }
    }
  }
`

export const RELEASE_BOOK = gql`
mutation($id: ID!) {
    releaseBook(id: $id) {
      id
    title
    reservedDate
    reserved
    reservationHistory
    available
    expired {
      expiryDate
      isExpired
      timeFormate
    }
    reservedBy {
      id
    }
    }
  }
`

export const CREATE_USER = gql`
mutation($email: String!, $username: String!, $password: String!, $profession: String!) {
    createUser(username: $username, password: $password, profession: $profession, email: $email) {
      username
    }
  }
`

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      id
    }
  }
`
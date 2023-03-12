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
mutation($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
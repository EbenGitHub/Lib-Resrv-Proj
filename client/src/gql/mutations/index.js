import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query AllAuthors {
    allAuthors {
    name
    born
    bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      genres
      id
      published
      title
    }
  }
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author {
        bookCount
        born
        id
        name
      }
      genres
      id
      published
      title
    }
  }
`

export const SET_BORN = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query{
  me {
    favouriteGenre
    username
    id
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        bookCount
        born
        id
        name
      }
      genres
      id
      published
      title
    }
  }
`
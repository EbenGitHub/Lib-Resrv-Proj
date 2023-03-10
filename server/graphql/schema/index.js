const typeDefs = `
  type User {
    username: String!
    reservedBooks: [Book!]
    reservedBookCounts: Int!
  }
  type Book {
    title: String!
    author: String!
    reserved: Boolean!
    reservedDate: String
    reservedBy: User
    catagory: [String]!
    reservationHistory: [String]!
    id: ID!
  }
  type Query {
    books(catagory: String, title: String): [Book!]!
    users: [User!]!
    me: User
  }
  type Mutation {
    createUser(
      username: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    reserveBook(
      id: ID!
    ): Boolean!
    releaseBook(
      id: ID!
    ): Boolean!

  }
  type Token {
    value: String!
  }
`

module.exports = typeDefs
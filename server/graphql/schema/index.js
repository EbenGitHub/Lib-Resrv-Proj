const typeDefs = `

  type User {
    id: ID!
    username: String!
    reservedBooks: [Book]!
    reservedBookCounts: Int!
  }
  
  type Status {
    state: String!
    mode: String!
  }

  type Expiry {
    isExpired: Boolean!
    expiryDate: Int!
    timeFormate: String!
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
    available: Boolean!
    expired: Expiry
  }

  type Query {
    books(catagory: String, title: String): [Book!]!
    book(id: ID!): Book
    users: [User!]!
    me: User
    status: Status!
  }

  type Mutation {
    createUser(
      username: String!
      profession: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    reserveBook(
      id: ID!
    ): Book
    releaseBook(
      id: ID!
    ): Book
  }

  type Token {
    value: String!
    id: ID!
  }

  type Subscription {
    bookReserved: Book!
    bookReleased: Book!
  }
`

module.exports = typeDefs
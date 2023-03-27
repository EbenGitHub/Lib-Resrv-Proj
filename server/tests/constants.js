
const ME = `query { me { id username } }`

const RESERVE_BOOK = `mutation($id: ID!) {
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

const RELEASE_BOOK = `mutation($id: ID!) {
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

const CREATE_USER = `
mutation($email: String!, $username: String!, $password: String!, $profession: String!) {
    createUser(username: $username, password: $password, profession: $profession, email: $email) {
      username
    }
  }
`

const LOG_IN = `mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      id
    }
  }`

const ALL_BOOKS = `query { 
        books { 
            title 
            reserved 
            author 
            reservedDate 
            reservedBy { 
                id 
            } 
            reservationHistory 
            available 
            expired { 
                isExpired 
            } 
        } 
    }`

const BOOKS_WITH_TITLE = `query($title: String) { 
    books(title: $title) { 
        title 
    } 
}`

  
const constants = {
    RESERVE_BOOK, 
    RELEASE_BOOK, 
    CREATE_USER,
    ME, 
    LOG_IN,
    ALL_BOOKS,
    BOOKS_WITH_TITLE
  }

module.exports = constants
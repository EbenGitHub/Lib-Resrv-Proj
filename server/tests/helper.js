const Config = require("../config")
const mongoose = require('mongoose')
const uuid = require("uuid")
const User = require('../models/user')
const Book = require('../models/book')

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

const startDB = async () => {
    mongoose.set('strictQuery', false)

      require('dotenv').config()

      const MONGODB_URI = Config.MONGODB_URI
      const MODE = Config.MODE
      const PORT = Config.PORT

      console.log('connecting to', MONGODB_URI)
      try {
        await mongoose.connect(MONGODB_URI)
        console.log('connected to db', 'PORT', PORT, 'MODE', MODE)
      } catch (e) {
        console.log(e)
      }
}

const reserveForUser = async ({bookId, userId}) => {
    const date = new Date()
    const resId = uuid.v4()

    const book = await Book.findById(bookId)
    const user = await User.findById(userId)

    book.reservedBy = user
    book.reserved = true
    book.reservedDate = date

    const newHistory = {
        reserverUser: user.id,
        reservationDate: date.toString(),
        releaseDate: '',
        Id: resId
    }

    book.reservationHistory = book.reservationHistory.concat(JSON.stringify(newHistory))
    user.reservedBooks = user.reservedBooks.concat(book)
    user.reservationId = resId

    await  book.save()
    await user.save()
}

const helper = {RESERVE_BOOK, RELEASE_BOOK, CREATE_USER, LOG_IN, startDB, reserveForUser}
module.exports = helper
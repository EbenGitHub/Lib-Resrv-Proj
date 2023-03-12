const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql') 
const Book = require('../../models/book')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const uuid = require("uuid")
const Config = require("../../config")
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

require('dotenv').config()

const saltRounds = parseInt(process.env.SALT_ROUNDS)
const maxResrDays = process.env.MAX_RESERVATION_TIME.split('-')

const interval = (n) => {
    let intrv = 1000
    switch(n) {
      case 'd':
        intrv *= 24;
      case 'h':
        intrv *= 60;
      case 'm':
        return intrv *= 60;
      default:
        return intrv;
    }
}

const timeFormateConver = () => {
  switch(maxResrDays[1]) {
    case 'd':
      return 'Days';
    case 'h':
      return 'Hours';
    case 'm':
      return 'Minutes';
    default:
      return 'Not Specified';
  }
}

const timeDiff = (date) => {
  const intrv = interval(maxResrDays[1])
  const date1 = new Date(date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDate = Math.ceil(diffTime / (intrv)); 
  return diffDate
}

const isResrvExp = (date) => {
    const diffDate = timeDiff(date)
    return diffDate >= parseInt(maxResrDays[0])
}

const reserve = async (book, currUser) => {
  if (book.reserved) {
    if (book.reservedBy._id.toString() === currUser.id) {
      currUser.reservedBooks = currUser.reservedBooks.filter(b => b._id.toString() !== book.id)
    } else {
      oldUser = await User.findById(book.reservedBy._id.toString())
      release(book, oldUser)
      await oldUser.save()
    }
  }
  const resId = uuid.v4()
  const date = new Date()
  book.reservedBy = currUser
  book.reserved = true
  book.reservedDate = date
  const newHistory = {
    reserverUser: currUser.id,
    reservationDate: date.toString(),
    releaseDate: '',
    Id: resId
  }
  book.reservationHistory = book.reservationHistory.concat(JSON.stringify(newHistory))
  currUser.reservedBooks = currUser.reservedBooks.concat(book)
  currUser.reservationId = resId
} 

const release = (book, currUser) => {
  book.reserved = false
  const history = book.reservationHistory.map(h => {
    let hist = JSON.parse(h)
    if (hist.Id === currUser.reservationId) {
        hist.releaseDate = new Date().toString()
    }
    return JSON.stringify(hist)
  })
  book.reservationHistory = history
  currUser.reservedBooks = currUser.reservedBooks.filter(b => b.toString() !== book.id)
} 

const check = (book, currUser, state = 'res') => {
  const bksResByUsr = currUser.reservedBooks.map(b => b.toString())
  const bkId = book._id.toString()
  if (book.locked) return false
  if (state === 'rel') return (bksResByUsr.includes(bkId) && book.reservedBy.toString() === currUser._id.toString())
  else if (state === 'res') {
    if (book.reserved) return isResrvExp(book.reservedDate)
    return true
  } else {
    return false
  }
} 

const resolvers = {
    Query: {
      books: async (_root, args) => {
        let response = []
        if (args.catagory) {
          const book = await Book.find({catagory: args.catagory}).populate('reservedBy')
          response = response.concat(book) 
        } 
        if (args.title) {
            const book = await Book.find({ title : { $regex:  RegExp(args.title), $options: 'i' } })
            response = response.concat(book)
        }
        if (!args.catagory && !args.title) {
          return Book.find({}).populate('reservedBy')
        }
        return response
      },
      users: async () => User.find({}).populate('reservedBooks'),
      me: (_root, _args, {currUser}) => currUser ? currUser.populate('reservedBooks') : null,
      status: () => ({state: 'ok', mode: Config.MODE})
    },
    User: {
      reservedBookCounts: (root) => root.reservedBooks.length
    },
    Book: {
      available: (root, _args) => {
        if (root.locked || (root.reserved && !isResrvExp(root.reservedDate))) return false
        return true
      },
      expired: (root, _args, {currUser}) => {
        if (root.locked || !currUser || !root.reserved || (root.reserved && root.reservedBy._id.toString() !== currUser.id)) return null
        const isExpired = isResrvExp(root.reservedDate)
        const expiryDate = parseInt(maxResrDays[0]) - timeDiff(root.reservedDate)
        const timeFormate = timeFormateConver()
        return {isExpired, expiryDate, timeFormate}
      },
      reservationHistory: async(root, _args, {currUser}) => {
        if (!currUser) return []
        const history = root.reservationHistory.filter(h => {
          let his = JSON.parse(h)
          if (his.reserverUser === currUser.id) {
            return true
          } else {
            return false
          }
        }).map(h => {
          const his = JSON.parse(h)
          return `You reserved this book at ${his.reservationDate} ${his.releaseDate ? `and released the book at ${his.releaseDate}` : `and the book taking date has expired`}`
        })
        return history
      }
    },
    Mutation: {
      createUser: async (_root, args) => {
        if (args.password.length < 6) throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.password,
            reason: 'password must be minimum length of 6',
            error: 'password length is less than 6'
          }
        })
        let username = args.username
        let profession = args.profession
        let hashedPassword = await bcrypt.hash(args.password, saltRounds)
        let user = new User({username, hashedPassword, profession})
              
        try {
          await user.save()
        } catch (error) {
          throw new GraphQLError('Saving user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              reason: error.errors.username.message,
              error
            }
          })
        }
              
        return user
      },
      login: async (_root, args) => {
        let user = await User.findOne({username: args.username})
          if (!user) {
            throw new GraphQLError('Unauthorized user', {
              extensions: {
                code: 'BAD_USER_INPUT',
                reason: 'user not found'
              }
            })
          }

          const isAuth = await bcrypt.compare(args.password, user.hashedPassword)
              
          if (!isAuth) {
            throw new GraphQLError('Unauthorized user', {
              extensions: {
                code: 'BAD_USER_INPUT',
                reason: 'invalid password'
              }
            })
          }
              
          const userToken = {
            username: user.username,
            id: user._id,
          }
              
          let encToken = jwt.sign(userToken, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP_TIME})
          return { value: encToken }
      },
      reserveBook: async (_root, args, {currUser}) => {

        if (!currUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        let book = null
        try {
            book = await Book.findById(args.id)
            if (!book) throw new Error('book not found')
        } catch(e) {
          throw new GraphQLError('Finding Book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.id,
              reason: 'can not find the book by the id',
              error: e
            }
            })
        }

        if (!check(book, currUser, 'res')) return null
        await reserve(book, currUser)

        try {
          await book.save()
          await currUser.save()
        } catch(e) {
            throw new GraphQLError('Reserving a Book failed', {
              extensions: {
              code: 'BAD_USER_INPUT',
              reason: 'some error happend. try later',
              error: e
            }
          })
        }

        pubsub.publish('BOOK_RESERVED', { bookReserved: book })
        return book.populate('reservedBy')

      },
      releaseBook: async (_root, args, {currUser}) => {

        if (!currUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        let book = null
        try {
            book = await Book.findById(args.id)
            if (!book) throw new Error('book not found')
        } catch(e) {
          throw new GraphQLError('Finding Book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.id,
              reason: 'can not find the book by the id',
              error: e
            }
            })
        }

        if (!check(book, currUser, 'rel')) return null
        release(book, currUser)

        try {
          await book.save()
          await currUser.save()
        } catch(e) {
            throw new GraphQLError('Releasing the Book failed', {
              extensions: {
              code: 'BAD_USER_INPUT',
              reason: 'some error happend. try later',
              error: e
            }
          })
        }

        pubsub.publish('BOOK_RELEASED', { bookReleased: book })
        return book.populate('reservedBy')
      }
    },
    Subscription: {
      bookReserved: {
        subscribe: () => pubsub.asyncIterator('BOOK_RESERVED')
      },
      bookReleased: {
        subscribe: () => pubsub.asyncIterator('BOOK_RELEASED')
      },
    },
  }
  
module.exports = resolvers
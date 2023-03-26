const { ApolloServer } = require('@apollo/server')
const typeDefs = require('../graphql/schema/index')
const resolvers = require('../graphql/resolvers/index')
const mongoose = require('mongoose')
const User = require('../models/user')
const Book = require('../models/book')
const bcrypt = require('bcrypt')
const helper = require('./helper')

let GlobalDataBase = {testServer: null, token: null, bookId: null, user: null}

jest.setTimeout(20 * 1000)

describe("mutation test", () => {
    beforeAll(async () => {

      await helper.startDB()

      const books = await Book.find({})
      GlobalDataBase.bookId = books[0]._id.toString()
      books[0].available = true
      books[0].reserved = false
      await books[0].save()

      await User.deleteMany()

      const saltRounds = parseInt(process.env.SALT_ROUNDS)
      const hashedPassword = await bcrypt.hash('password', saltRounds)
      const user = new User( {
        username: "ebenezer esh",
        email: "ebe.goo@gmail.com",
        hashedPassword: hashedPassword
    })

      await user.save()
      GlobalDataBase.user = user

      GlobalDataBase.testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })

    test('user can be created', async () => {
      const response = await GlobalDataBase.testServer.executeOperation({
        query: helper.CREATE_USER,
        variables: {
            email: 'test.gql@jest.com',
            username: 'love test',
            password: 'jestfortest1234',
            profession: 'Student'
        }
      });

      expect(response.body.singleResult.data.createUser.username).toBe('love test');
    }, 10000);

    test('user can log in', async () => {
      const response = await GlobalDataBase.testServer.executeOperation({
        query: helper.LOG_IN,
          variables: {
            username: 'love test',
            password: 'jestfortest1234',
        }      });

        GlobalDataBase.token = `Bearer ${response.body.singleResult.data.login.value}`

      expect(response.body.singleResult.data.login.value).toBeDefined();
    }, 10000);

    describe("reserving a book", () => {
      test('authenticated user can reserve a book', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.RESERVE_BOOK,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: await User.findById(GlobalDataBase.user.id) },
        });
        
        expect(response.body.singleResult.data.reserveBook).toBeDefined();
        expect(response.body.singleResult.data.reserveBook.available).toBe(false);
        expect(response.body.singleResult.data.reserveBook.reserved).toBe(true);
        expect(response.body.singleResult.data.reserveBook.reservedBy.id).toBe(GlobalDataBase.user.id);
        expect(response.body.singleResult.data.reserveBook.expired.isExpired).toBe(false);
        expect(response.body.singleResult.data.reserveBook.expired.expiryDate).toBe(2);
        expect(response.body.singleResult.data.reserveBook.expired.timeFormate).toBe("Days");
      }, 10000);

      test('unauthenticated user can not reserve a book', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.RESERVE_BOOK,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: null },
        });
        
        expect(response.body.singleResult.data.reserveBook).toBe(null)
        expect(response.body.singleResult.errors[0].message).toBe('not authenticated')
      }, 10000);
    }, 20000)

    describe("releasing a book", () => {

      beforeEach(async () => {
        await helper.reserveForUser({bookId: GlobalDataBase.bookId, userId: GlobalDataBase.user.id})
      })

      test('authenticated user can release a book', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.RELEASE_BOOK,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: await User.findById(GlobalDataBase.user.id) },
        });
  
        expect(response.body.singleResult.data.releaseBook).toBeDefined();
        expect(response.body.singleResult.data.releaseBook.available).toBe(true);
        expect(response.body.singleResult.data.releaseBook.reserved).toBe(false);
        expect(response.body.singleResult.data.releaseBook.reservationHistory.length).not.toEqual(0);
      }, 10000);
  
      test('unauthenticated user can not release a book', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.RELEASE_BOOK,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: null },
        });
  
        expect(response.body.singleResult.data.releaseBook).toBe(null)
        expect(response.body.singleResult.errors[0].message).toBe('not authenticated')
      }, 10000);
  
      test('one user can not release a book reserved by other user', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.RELEASE_BOOK,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: await User.findOne({username: "love test"}) },
        });
  
        expect(response.body.singleResult.data.releaseBook).toBe(null)
      }, 10000);
    }, 20000)

    describe("ME query", () => {
      test('me request for unauthenticated user is null', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.ME,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: null },
        });
        
        expect(response.body.singleResult.data.me).toBe(null)
      }, 10000);
  
      test('me request for authenticated user is not null', async () => {
        const response = await GlobalDataBase.testServer.executeOperation({
          query: helper.ME,
          variables: {
            id: GlobalDataBase.bookId
          }
        }, 
        {
          contextValue: { currUser: await User.findById(GlobalDataBase.user.id) },
        });
        
        expect(response.body.singleResult.data.me.id).toBeDefined()
        expect(response.body.singleResult.data.me.username).toBeDefined()
      }, 10000);
    }, 20000)
    
}, 90000)
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('../graphql/schema/index')
const resolvers = require('../graphql/resolvers/index')
const mongoose = require('mongoose')
const User = require('../models/user')
const Book = require('../models/book')
const bcrypt = require('bcrypt')
const constants = require('./constants')
const helper = require('./helper')

let GlobalDataBase = {testClient: null, testServer: null, bookId: null, userId: null}

jest.setTimeout(20 * 1000)

describe.skip("subscription test", () => {
    beforeAll(async function () {
  
        await helper.startDB()
  
        const books = await Book.find({})
        GlobalDataBase.bookId = books[0]._id.toString()
  
        await User.deleteMany()
  
        const saltRounds = parseInt(process.env.SALT_ROUNDS)
        const hashedPassword = await bcrypt.hash('password', saltRounds)
        const user = new User( {
          username: "ebenezer esh",
          email: "ebe.goo@gmail.com",
          hashedPassword: hashedPassword
      })
  
        await user.save()
        GlobalDataBase.userId = user._id.toString()
  
        // Create an ApolloServer instance with your schema and resolvers
        GlobalDataBase.testServer = new ApolloServer({
          typeDefs,
          resolvers,
        });

        // Create a test client for your server
        GlobalDataBase.testClient = createTestClient(GlobalDataBase.testServer).subscribe
      })
  
      afterAll(async () => {
        await mongoose.connection.close()
        // await GlobalDataBase.testClient.kill( )
      })
      
      // Write a test case for your subscription
      test('subscription test for reservation', async () => {

        await helper.releaseForUser({bookId: GlobalDataBase.bookId, userId: GlobalDataBase.userId})

        // Subscribe to the 'count' subscription
        const subscription = await GlobalDataBase.testClient({
          query: constants.RESERVE_BOOK_SUB,
        });

        // Reserve one
        await GlobalDataBase.testServer.executeOperation({
            query: constants.RESERVE_BOOK,
            variables: {
              id: GlobalDataBase.bookId
            }
          }, 
          {
            contextValue: { currUser: await User.findById(GlobalDataBase.userId) },
          });
      
        // Wait for the subscription to receive a message
        const result = await subscription.next();
      
        // Assert that the received message is correct
        console.log(result.value.data)
        expect(result.value.data.count).toEqual(1);
      });

      // Write a test case for your subscription
      test('subscription test', async () => {

        await helper.reserveForUser({bookId: GlobalDataBase.bookId, userId: GlobalDataBase.userId})

        // Subscribe to the 'count' subscription
        const subscription = await GlobalDataBase.testClient({
          query: constants.RELEASE_BOOK_SUB,
        });
        
         // Reserve one
         await GlobalDataBase.testServer.executeOperation({
            query: constants.RESERVE_BOOK,
            variables: {
              id: GlobalDataBase.bookId
            }
          }, 
          {
            contextValue: { currUser: await User.findById(GlobalDataBase.userId) },
          });
      
          // Wait for the subscription to receive a message
          const result = await subscription.next();
          
          // Assert that the received message is correct
          console.log(result.value.data)
        expect(result.value.data.count).toEqual(1);
      });

})

const { ApolloServer } = require('@apollo/server')
const typeDefs = require('../graphql/schema/index')
const resolvers = require('../graphql/resolvers/index')
const Config = require("../config")
const mongoose = require('mongoose')
const User = require('../models/user')
const fun = require('../seed')

let GlobalDataBase = {testServer: null, token: null}

describe("mutation test", () => {
    beforeAll(async () => {
      
      await fun()

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

      await User.deleteMany()

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
        query: `
        mutation($email: String!, $username: String!, $password: String!, $profession: String!) {
            createUser(username: $username, password: $password, profession: $profession, email: $email) {
              username
            }
          }
        `,
        variables: {
            email: 'test.gql@jest.com',
            username: 'love test',
            password: 'jestfortest1234',
            profession: 'Student'
        }
      });

      expect(response.body.singleResult.data.createUser.username).toBe('love test');
    });

    test('user can log in', async () => {
      const response = await GlobalDataBase.testServer.executeOperation({
        query: `mutation($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              value
              id
            }
          }`,
          variables: {
            username: 'love test',
            password: 'jestfortest1234',
        }      });

        GlobalDataBase.token = response.body.singleResult.data.login.value

      expect(response.body.singleResult.data.login.value).toBeDefined();
    });
    
}, 20000)
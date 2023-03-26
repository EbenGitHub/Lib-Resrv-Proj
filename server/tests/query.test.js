const { ApolloServer } = require('@apollo/server')
const typeDefs = require('../graphql/schema/index')
const resolvers = require('../graphql/resolvers/index')
const Config = require("../config")
const mongoose = require('mongoose')

let GlobalDataBase = {testServer: null}

jest.setTimeout(20 * 1000)

describe("query test", () => {
    beforeAll(async () => {
            
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

      GlobalDataBase.testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })

    test('returns all books with necessary returns', async () => {
      const response = await GlobalDataBase.testServer.executeOperation({
        query: 'query { books { title reserved author reservedDate reservedBy { id } reservationHistory available expired { isExpired } } }',
      });

      expect(response.body.singleResult.data?.books).toHaveLength(7);

      expect(response.body.singleResult.data?.books[0].title).toBe('Get started with JS.');
      expect(response.body.singleResult.data?.books[0].author).toBe('Math Neglson');
      expect(response.body.singleResult.data?.books[0].available).toBe(false);

      expect(response.body.singleResult.data?.books[1].title).toBe('Python is easy');
      expect(response.body.singleResult.data?.books[1].author).toBe('Nail Will');

      expect(response.body.singleResult.data?.books[2].title).toBe('Learn full React course');
      expect(response.body.singleResult.data?.books[2].reserved).toBe(false);
      expect(response.body.singleResult.data?.books[2].available).toBe(true);

      expect(response.body.singleResult.data?.books[3].title).toBe('Top 10 leading technologies');
      expect(response.body.singleResult.data?.books[3].reserved).toBe(false);
      expect(response.body.singleResult.data?.books[3].available).toBe(true);
      expect(response.body.singleResult.data?.books[3].reservationHistory[0]).toBe("You need to login to see your reservation histories");

      expect(response.body.singleResult.data?.books[4].title).toBe('You need to know this');
      expect(response.body.singleResult.data?.books[4].reserved).toBe(false);
      expect(response.body.singleResult.data?.books[4].available).toBe(true);

      expect(response.body.singleResult.data?.books[5].title).toBe('why you need to be a programmer');
      expect(response.body.singleResult.data?.books[5].expired).toBe(null);
      expect(response.body.singleResult.data?.books[5].available).toBe(true);

      expect(response.body.singleResult.data?.books[6].title).toBe('ChatGPT and its impact');
      expect(response.body.singleResult.data?.books[6].author).toBe('Nail Will');
    }, 20000);

    test('returns books with provided title', async () => {
      const response = await GlobalDataBase.testServer.executeOperation({
        query: 'query($title: String) { books(title: $title) { title } }',
        variables: { title: 'react' },
      });

      expect(response.body.singleResult.data?.books).toHaveLength(1);
      expect(response.body.singleResult.data?.books[0].title).toBe('Learn full React course');
    }, 20000);

}, 40000)
const { ApolloServer } = require('@apollo/server')
const typeDefs = require('../graphql/schema/index')
const resolvers = require('../graphql/resolvers/index')
const mongoose = require('mongoose')
const helper = require('./helper')
const constants = require('./constants')

let GlobalDataBase = {testServer: null}

jest.setTimeout(20 * 1000)

describe("query test", () => {
    beforeAll(async () => {

      await helper.startDB()

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
        query: constants.ALL_BOOKS,
      });

      expect(response.body.singleResult.data?.books).toHaveLength(7);

      const titles = response.body.singleResult.data.books.map(b => b.title)

      expect(titles).toContain('Get started with JS.');
      expect(titles).toContain('Python is easy');
      expect(titles).toContain('Learn full React course');
      expect(titles).toContain('Top 10 leading technologies');
      expect(titles).toContain('You need to know this');
      expect(titles).toContain('why you need to be a programmer');
      expect(titles).toContain('ChatGPT and its impact');

      const authors = response.body.singleResult.data.books.map(b => b.author)

      expect(authors).toContain('Math Neglson');
      expect(authors).toContain('Nail Will');

      const histories = response.body.singleResult.data.books.map(b => b.reservationHistory[0])

      expect(histories).toContain('You need to login to see your reservation histories');

      const expiry = response.body.singleResult.data.books.map(b => b.expired)

      expect(expiry).toContain(null);
    }, 20000);

    test('returns books with provided title', async () => {
      const response = await GlobalDataBase.testServer.executeOperation({
        query: constants.BOOKS_WITH_TITLE,
        variables: { title: 'react' },
      });

      expect(response.body.singleResult.data?.books).toHaveLength(1);
      expect(response.body.singleResult.data?.books[0].title).toBe('Learn full React course');
    }, 20000);

}, 40000)
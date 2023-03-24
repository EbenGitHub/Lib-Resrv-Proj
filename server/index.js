const { ApolloServer } = require('@apollo/server')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const typeDefs = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const Config = require('./config')
const path = require('path');

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = Config.MONGODB_URI
const MODE = Config.MODE
const PORT = Config.PORT

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log("connected to MongoDB")
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

const start = async () => {
  const app = express()
  
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currUser = await User.findById(decodedToken.id)
          return { currUser }
        }
      },
    }),
  )

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}, MODE: ${MODE}`)
  )
}

start()
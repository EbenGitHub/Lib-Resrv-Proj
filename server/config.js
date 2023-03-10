require('dotenv').config()

const MODE = process.env.NODE_ENV

const MONGODB_URI = (MODE === 'production') ? 
        process.env.MONGODB_URI : 
    (MODE === 'development') ? 
        process.env.MONGODB_URI_DEV :
    (MODE === 'test') ? 
        process.env.MONGODB_URI_TES : null

const PORT = parseInt(process.env.PORT) || 4000

module.exports = {MODE, MONGODB_URI, PORT}
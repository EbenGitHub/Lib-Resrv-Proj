require('dotenv').config()

const MODE = process.env.NODE_ENV
const VERSION = process.env.VERSION
const MONGODB = process.env.DB_STATUS === 'online' ? process.env.MONGODB_ATL : process.env.MONGODB_LOC

const DB = (MODE === 'production') ? 
            process.env.DB_PRO : 
        (MODE === 'development') ? 
            process.env.DB_DEV :
        (MODE === 'test') ? 
            process.env.DB_TES : null

const MONGODB_URI = MONGODB.replace('(REPLACE_ME)', DB)

const PORT = parseInt(process.env.PORT) || 4000

module.exports = {MODE, MONGODB_URI, PORT, VERSION}
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid = require("uuid")
const readline = require("readline")
const Config = require('./config')

const User = require('./models/user');
const Book = require('./models/book');

require('dotenv').config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const MONGODB_URI = Config.MONGODB_URI || process.env.MONGODB_URI
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const fun = async () => {
    try {
        mongoose.set('strictQuery', false)
        console.log('connecting to', MONGODB_URI)
        await mongoose.connect(MONGODB_URI)
        console.log("connected to MongoDB")

        User.deleteMany()
        Book.deleteMany()

        const hashedPassword = await bcrypt.hash('password', saltRounds)

        const user1 = new User({
            username: "ebenezer esh",
            hashedPassword: hashedPassword
        })
        const user2 = new User({
            username: "samuel mat",
            hashedPassword: hashedPassword
        })

        await user1.save()
        await user2.save()

        const book1 = new Book({
            title: "Get started with JS.",
            reserved: false,
            author: "Math Neglson",
        })
        
        const book2 = new Book({
            title: "Python is easy",
            reserved: false,
            author: "Nail Will",
        })

        await book1.save()
        await book2.save()

        // reserve one book
        const date = new Date()
        const resId = uuid.v4()

        book2.reservedBy = user1
        book2.reserved = true
        book2.reservedDate = date

        const newHistory = {
            reserverUser: user1.id,
            reservationDate: date.toString(),
            releaseDate: '',
            Id: resId
        }

        book2.reservationHistory = book2.reservationHistory.concat(JSON.stringify(newHistory))
        user1.reservedBooks = user1.reservedBooks.concat(book2)
        user1.reservationId = resId

        await user1.save()
        await book2.save()

        console.log('seeding was successful')
        mongoose.connection.close()
    } catch(e) {
        console.log('error connection to MongoDB:', e.message)
    }
}

rl.question("This will delete all your documents in your database! Are you sure you want to continue?(y/n)\n", function (string) {
    userInput = string;
  
    if (userInput === 'y') {
        fun()
    } else {
        console.log('opration aborted')
    }
  
    rl.close();
});

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

const MONGODB_URI = Config.MONGODB_URI
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const fun = async () => {
    try {
        mongoose.set('strictQuery', false)
        console.log('connecting to', MONGODB_URI)
        await mongoose.connect(MONGODB_URI)
        console.log("connected to MongoDB")

        await User.deleteMany()
        await Book.deleteMany()

        const hashedPassword = await bcrypt.hash('password', saltRounds)

        const users = [
            {
                username: "ebenezer esh",
                email: "ebe.goo@gmail.com",
                hashedPassword: hashedPassword
            },
            {
                username: "abenezer esh 2",
                email: "ebe.goo@gmail.com",
                hashedPassword: hashedPassword
            },
            {
                username: "samuel mat",
                email: "sam.m@gmail.com",
                hashedPassword: hashedPassword
            }

        ]

        const books = [
            {
                title: "Get started with JS.",
                reserved: false,
                author: "Math Neglson",
            },
            {
                title: "Python is easy",
                reserved: false,
                author: "Nail Will",
            },
            {
                title: "why you need to be a programmer",
                reserved: false,
                author: "Nail Will",
            },
            {
                title: "ChatGPT and its impact",
                reserved: false,
                author: "Nail Will",
            },
            {
                title: "Learn full React course",
                reserved: false,
                author: "Nail Will",
            },
            {
                title: "Top 10 leading technologies",
                reserved: false,
                author: "Nail Will",
            },
            {
                title: "You need to know this",
                reserved: false,
                author: "Nail Will",
            }
        ]

        const usersModel = users.map(u => new User(u))
        const usersPromise = usersModel.map(u => u.save())
        await Promise.all(usersPromise)

        const booksModel = books.map(b => new Book(b))
        const booksPromise = booksModel.map(b => b.save())
        await Promise.all(booksPromise)

        // reserve one book
        const date = new Date()
        const resId = uuid.v4()

        const book = await Book.findOne({title: books[0].title})
        const user = await User.findOne({username: users[0].username})

        book.reservedBy = user
        book.reserved = true
        book.reservedDate = date

        const newHistory = {
            reserverUser: user.id,
            reservationDate: date.toString(),
            releaseDate: '',
            Id: resId
        }

        book.reservationHistory = book.reservationHistory.concat(JSON.stringify(newHistory))
        user.reservedBooks = user.reservedBooks.concat(book)
        user.reservationId = resId

        await  book.save()
        await user.save()

        console.log('seeding was successful')
        mongoose.connection.close()
    } catch(e) {
        console.log('error connection to MongoDB:', e.message)
        mongoose.connection.close()
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

module.exports = fun

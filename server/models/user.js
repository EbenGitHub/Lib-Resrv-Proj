const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true
  },
  profession: {
    type: String,
  },
  hashedPassword: {
    type: String,
    required: true
  },
  reservationId: {
    type: String,
  },
  reservedBooks: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Book'
    }
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)

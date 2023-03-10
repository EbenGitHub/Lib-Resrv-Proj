const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  reserved: {
    type: Boolean,
    required: true
  },
  reservedDate: {
    type: Date,
    default: Date.now()
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reservationHistory: [
    {
      type: String
    }
  ],
  author: {
    type: String,
    required: true
  },
  queue: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }
  ],
  locked: {
    type: Boolean,
    default: false
  },
  catagory: [
    {
      type: String
    }
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)
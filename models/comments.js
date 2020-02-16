const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentsSchema = new Schema({
  IdMovie: {
    type: String,
    required: true
  },
  NameMovie:{
    type: String,
    required: true
  },
  User: {
    type: String,
    required: true
  },
  MovieRating: {
    type: Number,
    required: true
  },
  CommentMovie:{      
    type: String
  },
  DateSave: {
    type: String
  }
})

module.exports = mongoose.model('commentMovies', commentsSchema)

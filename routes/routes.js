const express = require('express')
const useragent = require('express-useragent')
const bodyParser = require('body-parser')
const sesion = require('../methods/sesion')
const movie = require('../methods/movie')

const router = express.Router()
router.use(useragent.express())

// Session
// router.post('/sesion', sesion.addNew)

// movies
router.post('/movieByName', movie.getMovieByName)
router.post('/commentsByUser', movie.commentsByUser)

module.exports = router


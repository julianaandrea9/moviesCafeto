const helmet = require('helmet')
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/application')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

mongoose.connect(config.database, { useNewUrlParser: true }).then(() => {
  let app = express()
  const securePort = process.env.PORT || '8087'
  console.log('Mongo is connected ' + securePort)

  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.disable('x-powered-by')
  app.use(express.static(__dirname))
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json({limit: '50mb'}))
  app.use('/api', routes)

  http.createServer(app, (request, response) => {
    request.on('error', (err) => {
      console.error(err)
      response.end()
    })
  })
}).catch(err => console.error(`Database connection error: ${err.message}`))

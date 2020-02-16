const helmet = require('helmet')
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/application')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const app = express()

mongoose.Promise = global.Promise

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  let app = express()
  const securePort = process.env.PORT || '8087'
  console.log('Mongo is connected ' + securePort)

  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.disable('x-powered-by')
  app.use(express.static(__dirname))
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use('/api', routes)

  app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
  })

  http.createServer(app).listen(8087, () => {
    console.log('Server started at http://localhost:8087');
  })
}).catch(err => console.log(err))
const express = require('express')
const useragent = require('express-useragent')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(useragent.express())

router.use(bodyParser.text({ limit: '50mb' }))
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


module.exports = router

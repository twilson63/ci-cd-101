const express = require('express')
const app = express()
const cors = require('cors')

const dogs = require('./dogs')

app.use(cors())

app.use('/dogs', dogs)

app.get('/', (req, res) => {
  res.send({name: 'Dogs API'})
})

if (!module.parent) {
  app.listen(4000)
}

module.exports = app

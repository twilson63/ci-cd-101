const express = require('express')
const app = express()

const dogs = require('./dogs')

app.use('/dogs', dogs)

app.get('/', (req, res) => {
  res.send({name: 'Dogs API'})
})

if (!module.parent) {
  app.listen(3000)
}

module.exports = app

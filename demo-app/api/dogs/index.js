const express = require('express')

const bodyParser = require('body-parser')
const app = express()
const { list, create } = require('./data')

app.post('/', bodyParser.json(), async (req, res) => {
  const result = await create(req.body)
  res.send(result)
})

app.get('/', async (req, res) => {
  const results = await list()
  if (results.error) {
    return res.status(500).send({error: results.error})
  }
  res.send(results.docs)
})


module.exports = app

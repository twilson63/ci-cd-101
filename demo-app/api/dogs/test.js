require('isomorphic-fetch')
const test = require("tape")
const testServer = require('@twilson63/test-server')
const app = require('./')
const { mfetch, clear } = require('@twilson63/mock-fetch')


test('list dogs', async t => {
  mfetch.post(process.env.DB + '/_find',  {status: 200, body: { docs: fixture() }})

  const server = testServer(app)
  
  const result = await fetch(server.url).then(r => r.json())

  t.equal(result.length, 3)
  
  clear()
  server.close(t.end)
})

test('add dog', async t => {
  mfetch.post(process.env.DB, { status: 201, body: {ok: true}})
  const server = testServer(app)

  const result = await fetch(server.url, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Wilbur',
      breed: 'Terrier-Russel',
      avatar: 'https://placehold.it/300x300',
      images: []
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())

  t.ok(result.ok)

  server.close(t.end)
})


  function fixture() {
    return [ { _id: '27518bd741f908087f85c07e1300194e',
    _rev: '1-3467bf0e15f00c5186f93a0fb8357b0c',
    name: 'Wilbur',
    breed: 'Terrier-Russel',
    avatar: 'https://placehold.it/300x300',
    images: [],
    type: 'dog' },
  { _id: '4a91afbd2bac9528c7ec5ab3e80012a0',
    _rev: '1-3467bf0e15f00c5186f93a0fb8357b0c',
    name: 'Carrie',
    breed: 'Terrier-Russel',
    avatar: 'https://placehold.it/300x300',
    images: [],
    type: 'dog' },
  { _id: 'e106f4afa48b744d18b90cfdc1001aac',
    _rev: '1-3467bf0e15f00c5186f93a0fb8357b0c',
    name: 'Gretal',
    breed: 'Terrier-Russel',
    avatar: 'https://placehold.it/300x300',
    images: [],
    type: 'dog' } ]
  }

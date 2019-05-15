const db = process.env.DB
const token = process.env.DB_AUTH

const api = createApi()

function create (doc) {
  // validate doc
  doc.type = 'dog'
  return api.post(doc)
}

function list () {
  return api.find({
    selector: {
      type: 'dog'
    }
  })
}

module.exports = {
  create,
  list
}


function createApi() {
  return {
    find(query) {
      return fetch(db + '/_find', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'content-type': 'application/json',
          authorization: `Basic ${token}`
        }
      }).then(r => r.json())
    },
    post(doc) {
      return fetch(db, {
        method: 'POST', 
        body: JSON.stringify(doc),
        headers: {
          'content-type': 'application/json',
          authorization: `Basic ${token}`
        }
      }).then(r => r.json())
    },
    get(id) {
      return fetch(`${db}/${id}`, { headers: { 'content-type': 'application/json', authorization: `Basic ${token}`}})
    }
  }
} 

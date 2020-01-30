const fetch = require('node-fetch')

// requests a json file, and returns
async function reqJson (url, method = 'GET', data = null) {
  // set fetch options
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }

  // add body if content exists
  if (data) {
    options.body = JSON.stringify(data)
  }

  // await the fetch from the url
  const res = await fetch(url, options)

  // await until the json promise is resolved
  const json = await res.json()
  return json
}

module.exports = reqJson
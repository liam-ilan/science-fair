// requirements
const reqJson = require('../reqjson')
const fs = require('fs')
const request = require('request')

// arguments
const metadataPath = process.argv[2]
const folder = process.argv[3]

// get images
async function getImages (metadata, folder) {

  // download an image
  async function download (uri, filename, count) {
    // make a new promise
    return new Promise((resolve, reject) => {
      request.head(uri, function (err, res, body) {
        // error handling
        if (err) { console.log(err) }

        // pipe to the file, then resolve the promise, to stop blocking
        request(uri).pipe(fs.createWriteStream(filename)).on('finish', () => { resolve('done') })

        // log when finished
        console.log(`downloaded ${count}`)
      })
    })
  };

  // consts
  const baseURL = 'https://isic-archive.com/api/v1/image'

  let counter = 0
  // for every image
  for (const item of Object.keys(metadata)) {
    counter += 1

    // download image
    const uri = `${baseURL}/${item}/download`
    const fileName = `${folder}/${metadata[item].benign_malignant}/${item}.jpeg`

    await download(uri, fileName, counter)
  }
}

fs.readFile(metadataPath, 'utf8', function (err, data) {
  metadata = JSON.parse(data)
  getImages(metadata, folder)
})


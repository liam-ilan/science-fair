// requirements
const reqJson = require('../reqjson')
const fs = require('fs')

// arguments
const count = parseInt(process.argv[2], 10)
const fileName = process.argv[3]
const offset = parseInt(process.argv[4], 10)

// get metaData
async function getMetadata (limit, offset = 0, fileName) {
  fs.writeFile(fileName, '{', () => {})

  const baseURL = 'https://isic-archive.com/api/v1/image'

  // let positiveCount = 0
  // let negativeCount = 0
  // let i = 0

  // while (positiveCount + negativeCount < limit) {
  //   const arrOfImages = await reqJson(`${baseURL}?limit=1&offset=${i}`)
  //   const imageMetaData = await reqJson(`${baseURL}/${arrOfImages[0]._id}`)

  //   // let image = (await reqJson(`${baseURL}?limit=1&offset=${i}`))[0]
  //   // const metaData = (await reqJson(`${baseURL}/${image._id}`)).meta.clinical

  //   const clinical = imageMetaData.meta.clinical
  //   const string = '\n' + `"${imageMetaData._id}":` + JSON.stringify(clinical) + (positiveCount + negativeCount !== limit ? ',' : '')

  //   if (clinical.benign_malignant === "benign") {
  //     if (negativeCount < (limit / 2) + 10) {
  //       negativeCount += 1

  //       fs.appendFile(fileName, string, () => {})
  //       console.log(`finished ${positiveCount + negativeCount}`)
  //     }
  //   } else {
  //     if (positiveCount < (limit / 2) + 10) {
  //       positiveCount += 1

  //       fs.appendFile(fileName, string, () => {})
  //       console.log(`finished ${positiveCount + negativeCount}`)
  //     }
  //   }

  //   i += 1
  // }


  // for every image, get id, and collect metadata
  let i = 0
  let count = 0

  while (count < limit) {
    i += 1

    let item = (await reqJson(`${baseURL}?limit=1&offset=${i}`))[0]

    // get metadata
    const metaData = (await reqJson(`${baseURL}/${item._id}`)).meta.clinical
    const string = '\n' + `"${item._id}":` + JSON.stringify(metaData) + (i === limit ? '\n}' : ',')

    // write
    fs.appendFile(fileName, string, () => {})

    count += 1
    
    console.log(`finished ${i}`)
  }
}

getMetadata(count, offset, fileName)

# Science Fair - 2020

## What is this?
This repository contains the tools used to build my science fair. You should be able to find all the necessary tools to replicate the experiment here.

## Scripts:
For getting metadata:
```
node scripts/metadata.js <amount> <filename> <offset>
```

For getting images:
```
node scripts/images.js <metadatapath> <outputpath>
```

## Testing your model:
With PHP localhost:
```
npm start
```
(If you are using any other localhost, index.html is the file used to test the model.)


Note to change line 12 in index.html to reflect the path to your model. Your model should be a directory with:

1. weights (model.weights.bin)
2. model.json
3. metadata.json

These are all accessible after training a teachable machine model.

## Credit
All software written by Liam Ilan
Google's Teachable Machine by Google
ISIC archive used for images
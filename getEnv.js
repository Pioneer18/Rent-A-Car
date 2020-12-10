'use strict'

const fs = require('fs');

const dotEnvExists = fs.existsSync('.env');
if (dotEnvExists) {
    console.log('getEnv.js: .env exists, probably running on dev environment right now')
    process.exit()
}

// gcloud platform authentication is handled when app already running in cloud
const gcs = require('@google-cloud/storage')()

const bucketName = `envvars-rent-a-car`;
console.log(`Downloading .env from bucket ${bucketName}`);
gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
        console.info('getEnv.js: .env downloaded successfully');
    })
    .catch(e => {
        console.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
    })
const aws = require('aws-sdk');


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

export const s3 = new aws.S3({
    bucketName,
    region,
    accessKeyId,
    secretAccessKey
})


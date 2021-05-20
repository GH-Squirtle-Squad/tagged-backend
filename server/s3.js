const AWS = require('aws-sdk');
const fs = require('fs');

const bucket = process.env.BUCKET_NAME;
const region = process.env.REGION;
const key = process.env.KEY;
const secret = process.env.SECRET;

console.log('values: ', bucket, region, key, secret);

const s3 = new AWS.S3({
  accessKeyId: key,
  secretAccessKey: secret,
});

function uploadImage(file) {
  const image = fs.readFileSync(file.path);

  const params = {
    Bucket: bucket,
    Body: image,
    Key: file.filename,
  };
  console.log('params: ', params);
  return s3.upload(params).promise();
}

module.exports = uploadImage;

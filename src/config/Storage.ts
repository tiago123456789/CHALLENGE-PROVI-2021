import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
 
var s3 = new aws.S3({
    credentials: {
        // @ts-ignore
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        // @ts-ignore
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export default multer({
  storage: multerS3({
    s3: s3,
    // @ts-ignore
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const extension = file.originalname.split(".")[1]
      cb(null, Date.now().toString() + "." + extension)
    }
  })
})
 
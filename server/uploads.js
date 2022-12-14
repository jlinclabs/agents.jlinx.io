import Path from 'path'
import express from 'express'
import Router from 'express-promise-router'
import multer from 'multer'
import { v1 as uuid } from 'uuid'

export default pathPrefix => {
  // const MOUNT_POINT = '/api/uploads'
  const UPLOADS_PATH = process.env.UPLOADS_PATH
  if (!UPLOADS_PATH) {
    console.error(`invalid UPLOADS_PATH "${UPLOADS_PATH}"`)
    process.exit(1)
  }

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, UPLOADS_PATH);
      },
      filename: function (req, file, cb) {
        const extension = Path.extname(file.originalname);
        const filename = `${uuid()}${extension}`;
        console.log(`WRITING UPLOAD "${filename}"`);
        cb(null, filename);
      },
    })
  })

  const router = Router()

  router.post(`${pathPrefix}`,
    upload.single('file'),
    async function (req, res) {
      console.log('UPLOADING FILE', req.file)
      const url = `${req.get('origin')}${pathPrefix}/${req.file.filename}`
      console.log('CREATED UPLOAD', {url})
      res.json({url});
    }
  )

  router.use(`${pathPrefix}`, express.static(UPLOADS_PATH))

  return router
}

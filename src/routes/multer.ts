import express, { Request, Response } from 'express';
import { s3 } from '../s3'

const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const router = express.Router();


function checkFileType(file: any, cb: Function) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


interface MulterRequest extends Request {
    file: any;
    files: any
}


const manualUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'projectmaplegreen',
        // acl: 'public-read',
        key: function (req: Request, file: any, cb: Function) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req: Request, file: any, cb: Function) {
        checkFileType(file, cb);
    }
}).array('files', 3);


router.post('/', (req, res) => {
    manualUpload(req, res, ((err: Error) => {
        console.log('files', (req as MulterRequest).files);
        if (err) {
            console.log('errors', err);
            res.json({ error: err });
        } else {
            // If File not found
            if ((req as MulterRequest).files === undefined) {
                console.log('Error: No File Selected!');
                res.json({
                    filesArray: '',
                    locationArray: []
                })
            } else {
                // If Success
                let fileArray = (req as MulterRequest).files,
                    fileLocation;
                const filesLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    console.log('filename', fileLocation);
                    filesLocationArray.push(fileLocation)
                }
                // Save the file name into database
                res.json({
                    filesArray: fileArray,
                    locationArray: filesLocationArray
                });
            }
        }
    }));
});

const excelUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        // acl: 'public-read',
        key: function (req: Request, file: any, cb: Function) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req: Request, file: any, cb: Function) {
        checkFileType(file, cb);
    }
}).single('file')


// router.post('/import-excel', excelUpload.single('import-excel'), (req: Request, res: Response) => {
//     importFileToDb(__basedir + '/uploads/' + (req as MulterRequest).files.filename)
//     console.log(res)
// })

// function importFileToDb(exFile: any) {
//     readXlsxFile(exFile).then((rows) => {
//         rows.shift()
//         database.connect((error) => {
//             if (error) {
//                 console.error(error)
//             } else {
//                 let query = 'INSERT INTO user (id, name, email) VALUES ?'
//                 connection.query(query, [rows], (error, response) => {
//                     console.log(error || response)
//                 })
//             }
//         })
//     })
// }

export default router;
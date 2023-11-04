import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { PdfHandler } from "./PdfHandler";


const PORT = process.env.PORT || 3001;

const app = express();
// const upload  = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads/';
        fs.promises.mkdir(dir, { recursive: true }) // Ensure the directory exists
            .then(() => cb(null, dir))
            .catch(error => cb(error, dir));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        console.log("uploads/" + file.originalname);

        const pdfHandler = new PdfHandler("./uploads/" + file.originalname);
        pdfHandler.getParsedContent().then((content) => {
            console.log(content);
        });
    }
});

/**
 * The single() function takes the name of the field from the form that contains the file data,
 * and sets req.file to be the file object that contains information about the file.
 * If you want to upload multiple files, you can use the array() function instead.
 */
const upload = multer({ storage: storage });

/**
 * The upload.single() middleware is used when uploading a single file.
 * It accepts a single file with the name attribute file.
 * The single file will be stored in req.file.
 * If you want to upload multiple files, you can use the array() function instead.
 */
app.post('/uploads', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' })
  console.log(res);
}, (req, res, error) => {
    // This error handler is called if multer throws an error
    console.error(error);
    res.status(500).send(error || 'Internal server error');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
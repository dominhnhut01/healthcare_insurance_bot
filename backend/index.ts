import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';
import multer from 'multer';
import fs from 'fs';
import { PdfHandler } from "./UploadPDF/PdfHandler.ts";
import * as dotenv from 'dotenv';
import { weaviateRoute } from './Weaviate/weaviateRoute'; // import the weaviateRoute

dotenv.config();
const PORT = process.env.PORT || 3001;

const weaviate_key = process.env.WEAVIATE_API_KEY ?? '';
const cohere_key = process.env.COHERE_API_KEY ?? '';

if (!weaviate_key) {
    console.log("API KEY WAS NOT PROVIDED");
}

const weaviateClient = new weaviateRoute(weaviate_key, cohere_key);

const app = express();

/** Server Handling */
const httpServer = http.createServer(app);

/** Start Socket */
new ServerSocket(httpServer);

/** Log the request */
app.use((req, res, next) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


/** Socket Information */
// app.get('/status', (req, res, next) => {
//     return res.status(200).json({ users: ServerSocket.instance.rooms });
// });

/** Error handling */
// app.use((req, res, next) => {
//     const error = new Error('Not found');

//     res.status(404).json({
//         message: error.message
//     });
// });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads/';
        fs.promises.mkdir(dir, { recursive: true }) // Ensure the directory exists
            .then(() => cb(null, dir))
            .catch(error => cb(error, dir));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);

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

/** Listen */
const port = 4800
httpServer.listen(port, () => console.info(`Server is running at port ${port}`));
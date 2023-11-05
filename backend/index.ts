import http from 'http';
import express from 'express';
import { ServerSocket } from './socket';
import multer from 'multer';
import fs from 'fs';
import { PdfHandler } from "./UploadPDF/PdfHandler.ts";
import * as dotenv from 'dotenv';
import { WeaviateRoute } from './Weaviate/weaviateRoute';

dotenv.config();
const PORT = process.env.PORT || 3001;

const weaviateClient = new WeaviateRoute();

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

/** Listen */
const port = 4800
httpServer.listen(port, () => console.info(`Server is running at port ${port}`));

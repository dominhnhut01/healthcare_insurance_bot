import * as fs from 'fs';
import { getDocument } from 'pdfjs-dist';
import dotenv from 'dotenv';

export class PdfHandler {
  pdfBuffer: Uint8Array;

  constructor(filepath: string) {
    try {
      dotenv.config();
      const buffer: Buffer = fs.readFileSync(filepath);
      this.pdfBuffer = new Uint8Array(buffer);
    } catch (e: any) {
      throw new Error("Error reading file!");
    }
  }

  async getParsedContent(): Promise<string[]> {
    // initalize pdf
    const pdfjsLib = require('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

    // read pdf into buffer
    const pdfDocument = await getDocument({ data: this.pdfBuffer }).promise;
    const numPages: number = pdfDocument.numPages;

    // construct the content
    const textContents: string[] = [];

    for (let pageNumber = 31; pageNumber <= 40; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.forEach((item) => {
        if ('str' in item) {
          textContents.push(item.str);
        }
      });
    }
    return textContents;
  }

}
const pdfHandler = new PdfHandler('./test2.pdf');
console.log(await pdfHandler.getParsedContent());


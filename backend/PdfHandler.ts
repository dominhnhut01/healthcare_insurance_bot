import * as fs from 'fs';
import { getDocument } from 'pdfjs-dist';
import dotenv from 'dotenv';

export class PdfHandler {
  pdfBuffer: Uint8Array | undefined;

  constructor(filepath: string) {
    try {
      dotenv.config();
      const buffer: Buffer = fs.readFileSync(filepath);
      this.pdfBuffer = new Uint8Array(buffer);
    } catch (e: any) {
      console.log("Error reading file!");
    }
  }

  async getParsedContent(): Promise<string> {
    // initalize pdf
    const pdfjsLib = require('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

    // read pdf into buffer
    const pdfDocument = await getDocument({ data: this.pdfBuffer }).promise;
    const numPages: number = pdfDocument.numPages;

    // construct the content
    const textContents: string[] = [];

    // iterate through each page
    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => {
        if ('str' in item) {
          return item.str;
        }
      }).join(' ');
      textContents.push(`Page ${pageNumber} text: ${pageText}`);
    }
    return textContents.join('\n');
  }
}

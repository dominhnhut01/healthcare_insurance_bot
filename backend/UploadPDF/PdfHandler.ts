import * as fs from 'fs';
import { getDocument } from 'pdfjs-dist';
import dotenv from 'dotenv';
import { number } from 'cohere-ai/core/schemas';

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
    const pagesContents: string[] = [];
    
    for (let pageNumber = 30; pageNumber <= 45; pageNumber++) {
      const page = await pdfDocument.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText: string[] = [];
      textContent.items.forEach((item) => {
        if ('str' in item) {
          pageText.push(item.str);
        }
      });
      pagesContents.push(pageText.join(' '))
    }
    return pagesContents;
  }

}
// const pdfHandler = new PdfHandler('./test2.pdf');
// console.log(await pdfHandler.getParsedContent());

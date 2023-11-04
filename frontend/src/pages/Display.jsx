// import React from 'react';
// import { Document, Page } from 'react-pdf';

// const Display = () => {
//     // console.log('file on display:', file)
//     const file = '/Asst_3.pdf';
//     console.log('file on display:', file)
//     return (
//         <>
//             <Document file={file}>
//                 <Page pageNumber={0} />
//             </Document>
//         </>
//     );
// };

import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';

const Display = ({ file }) => {
    console.log('file on display:', file)
    // const fileUrl = localStorage.getItem(file);
    // console.log(fileUrl)

  return (
    <div style={{ height: '750px' }}>
      <Worker workerUrl="//unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js">
        <Viewer fileUrl={file} />
      </Worker>
    </div>
  );
};

export default Display;

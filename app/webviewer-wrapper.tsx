'use client';

import { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import { Button } from '../components/buttons';
import styles from './webviewer-wrapper.module.css';

export default function WebViewerWrapper() {
  const initialRef: any = null;
  const viewer = useRef(initialRef);
  const hiddenFileInput = useRef(initialRef);
  let viewerInstance = useRef(initialRef);
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/ExamplePDF.pdf',
        enableMeasurement: true
      },
      viewer.current,
      hiddenFileInput.current,
    ).then((instance: any) => {
      viewerInstance.current = instance;
    });
  }, []);

  function fileUploadHandle(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      viewerInstance.current.UI.loadDocument(file, { filename: file.name })
    }
  }

  function handleInputClick() {
    hiddenFileInput.current.click();
  };

  async function annotationsExportHandle() {
    let a = await viewerInstance.current.Core.annotationManager.exportAnnotations();
    const file = new Blob([a], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  }
  return (
    <div>
      <div>
        <Button className={styles.button} onClick={handleInputClick}>Upload file</Button>
        <input
          className={styles.inputCustomFile}
          type="file"
          name="file_upload"
          accept=".pdf"
          ref={hiddenFileInput}
          onChange={fileUploadHandle} />
      </div>
      <Button className={styles.button} onClick={annotationsExportHandle}>Download XFDF</Button>
      <div className={styles.webViewerWrapper} ref={viewer}></div>
    </div>
  )
}

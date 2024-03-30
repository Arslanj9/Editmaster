import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';

const PdfViewer = () => {
  const location = useLocation();
  const viewerRef = useRef(null);
  const webViewerInstanceRef = useRef(null);
  const cleanupInProgressRef = useRef(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [webViewerInitialized, setWebViewerInitialized] = useState(false);

  useEffect(() => {
    const initializeWebViewer = async () => {
      if (location?.state && selectedFile) { // Check if selectedFile exists
        const pdfFile = selectedFile;
  
        if (viewerRef.current && !webViewerInitialized) {
          if (cleanupInProgressRef.current) {
            return;
          }
  
          cleanupInProgressRef.current = true;
  
          if (webViewerInstanceRef.current) {
            webViewerInstanceRef.current.closeReader();
            webViewerInstanceRef.current = null;
          }
  
          // Initialize WebViewer instance only after selectedFile is set
          webViewerInstanceRef.current = await WebViewer(
            {
              path: 'lib',
              fullAPI: true
            },
            viewerRef.current
          ).then(instance => {
            instance.UI.loadDocument(pdfFile);
            setWebViewerInitialized(true);
            console.log(`This is inside clg: ${pdfFile}`)
          }).catch(error => {
            console.error('Error initializing WebViewer:', error);
          });
  
          cleanupInProgressRef.current = false;
        }
      }
    };
  
    initializeWebViewer();
  
    return () => {
      if (webViewerInstanceRef.current) {
        webViewerInstanceRef.current.closeReader();
      }
    };
  }, [location, selectedFile]); // Add selectedFile as a dependency
  


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };


  return (
    <>
      <div ref={viewerRef} style={{ width: '100%', height: '100vh' }}></div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
    </>

  ) 
  ;
};

export default PdfViewer;

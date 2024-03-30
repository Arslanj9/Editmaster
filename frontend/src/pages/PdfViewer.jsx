import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';
import { PDFContext } from '../contexts/pdfContext';

const PdfViewer = () => {
  const location = useLocation();
  const viewerRef = useRef(null);
  const webViewerInstanceRef = useRef(null);
  const cleanupInProgressRef = useRef(false);
  const [webViewerInitialized, setWebViewerInitialized] = useState(false);

  const { pdfData } = useContext(PDFContext)
  

  useEffect(() => {
    const initializeWebViewer = async () => {
      if (location?.state && pdfData) { // Check if selectedFile exists
        const pdfFile = pdfData;
  
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
  }, [location, pdfData]); // Add selectedFile as a dependency
  


  return (
    <>
      <div ref={viewerRef} style={{ width: '100%', height: '100vh' }}></div>
    </>

  ) 
  ;
};

export default PdfViewer;

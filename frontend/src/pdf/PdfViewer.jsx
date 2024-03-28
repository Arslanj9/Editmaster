import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import WebViewer from '@pdftron/webviewer';

const PdfViewer = () => {
  const location = useLocation();
  const viewerRef = useRef(null);
  const webViewerInstanceRef = useRef(null);
  const cleanupInProgressRef = useRef(false);

  useEffect(() => {
    const initializeWebViewer = async () => {
      if (location?.state) {
        const pdfFile = location.state.pdfFile;

        if (viewerRef.current) {
          if (cleanupInProgressRef.current) {
            return;
          }

          cleanupInProgressRef.current = true;

          if (webViewerInstanceRef.current) {
            webViewerInstanceRef.current.closeReader();
            webViewerInstanceRef.current = null;
          }

          setTimeout(async () => {
            webViewerInstanceRef.current = await WebViewer(
              {
                initialDoc: pdfFile,
              },
              viewerRef.current
            );

            cleanupInProgressRef.current = false;
          }, 100); 
        }
      }
    };

    initializeWebViewer();

    return () => {
      if (webViewerInstanceRef.current) {
        webViewerInstanceRef.current.closeReader();
      }
    };
  }, [location]);

  return <div ref={viewerRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default PdfViewer;

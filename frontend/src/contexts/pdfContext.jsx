import React, { createContext, useState } from 'react';

// Create a PDF context
export const PDFContext = createContext();


// PDF Provider component
export const PDFProvider = ({ children }) => {

  const [pdfData, setPDFData] = useState(null);


  const handlePDFUpload = (newData) => {
    setPDFData(newData);    
  };


  return (
    <PDFContext.Provider value={{ pdfData, handlePDFUpload }}>
      {children}
    </PDFContext.Provider>
  );
};

export default PDFProvider
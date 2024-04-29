// ImageContext.js
import React, { createContext, useState, useContext } from 'react';

export const ImageContext = createContext();

// export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imgData, setImgData] = useState('');

  const handleImgUpload = (image) => {
    setImgData(image);
  };


  return (
    <ImageContext.Provider value={{ imgData, handleImgUpload }}>
      {children}
    </ImageContext.Provider>
  );
};


export default ImageProvider
import React, { useContext, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useFabricJSEditor, FabricJSCanvas } from 'fabricjs-react';
import { ImageContext } from '../contexts/imageContext';

const ImageViewer = () => {
  const { editor, onReady } = useFabricJSEditor();
  const [isEditorInitialized, setIsEditorInitialized] = useState(false);
  const { imgData } = useContext(ImageContext)

  useEffect(() => {
    if (editor) {
      setIsEditorInitialized(true);
    }
  }, [editor]);


  
  useEffect(() => {
    console.log(`Inside imageViewer ${JSON.stringify(img)}`);
    
    // Check if img and editor exist
    if (img && editor) {
      fabric.Image.fromURL(img, (oimg) => {
        editor.canvas.add(oimg);
      });
    
      // Check if editor.canvas exists
      if (editor.canvas) {
        console.log('Canvas object:', editor.canvas);
      } else {
        console.error('Canvas is not initialized.');
      }
    } else {
      console.error('Editor is not initialized or img is missing.');
    }
  
    // Clean up function to remove the image from canvas when component unmounts
    return () => {
      editor?.canvas.clear();
    };
  }, [img, editor]);
  

  const onAddCircle = () => {
    if (isEditorInitialized) {
      const circle = new fabric.Circle({
        radius: 50,
        fill: 'red',
        left: 100,
        top: 100
      });
      editor?.canvas.add(circle);
    }
  };

  const onAddRectangle = () => {
    if (isEditorInitialized) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: 'blue'
      });
      editor?.canvas.add(rect);
    }
  };

  return (
    <div>
      <button onClick={onAddCircle}>Add Circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="image-canvas" width="2000" height="1000" onReady={onReady} />
    </div>
  );
};

export default ImageViewer;





























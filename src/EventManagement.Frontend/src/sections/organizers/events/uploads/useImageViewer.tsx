import { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

export default function useImageViewer(images: string[]) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return {
    open: openImageViewer,
    viewer: isViewerOpen ?
      <ImageViewer
        src={images}
        currentIndex={currentImage}
        disableScroll={false}
        closeOnClickOutside={true}
        onClose={closeImageViewer}

      />
      : null,
  }
}


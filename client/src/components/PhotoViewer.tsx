import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Photo } from "@shared/schema";

interface PhotoViewerProps {
  photo: Photo;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PhotoViewer({ 
  photo, 
  currentIndex, 
  totalPhotos, 
  onClose, 
  onNext, 
  onPrevious 
}: PhotoViewerProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Viewer Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <motion.div
          className="glassmorphism-strong rounded-3xl p-6 max-w-5xl max-h-[90vh] w-full relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <Button
            size="sm"
            className="absolute top-4 right-4 glassmorphism rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform duration-200 z-10"
            onClick={onClose}
            data-testid="button-close-viewer"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 glassmorphism rounded-full px-4 py-2 text-sm text-foreground z-10">
            <span data-testid="text-current-index">{currentIndex + 1}</span> of{" "}
            <span data-testid="text-total-photos">{totalPhotos}</span>
          </div>

          {/* Main Image */}
          <div className="relative mb-6">
            {!imageLoaded && (
              <div className="loading-shimmer w-full max-h-[60vh] h-96 rounded-2xl" />
            )}
            
            <img
              src={photo.url}
              alt={photo.title}
              className={`w-full max-h-[60vh] object-contain rounded-2xl transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
              }`}
              onLoad={() => setImageLoaded(true)}
              data-testid="img-viewer-photo"
            />
            
            {/* Navigation Arrows */}
            {totalPhotos > 1 && (
              <>
                <Button
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glassmorphism rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform duration-200"
                  onClick={onPrevious}
                  data-testid="button-previous-photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glassmorphism rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform duration-200"
                  onClick={onNext}
                  data-testid="button-next-photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>

          {/* Image Info */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-foreground" data-testid="text-photo-title">
                {photo.title}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid="text-photo-date">
                {formatDate(photo.date)}
              </p>
              {photo.location && (
                <p className="text-xs text-muted-foreground mt-1" data-testid="text-photo-location">
                  {photo.location}
                </p>
              )}
            </div>
            {photo.description && (
              <Button
                className="glassmorphism rounded-full px-6 py-3 hover:scale-105 transition-transform duration-200"
                onClick={toggleDescription}
                data-testid="button-toggle-description"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {isDescriptionVisible ? 'Hide Story' : 'Read Story'}
              </Button>
            )}
          </div>

          {/* Description Panel */}
          {photo.description && (
            <motion.div
              className={`absolute bottom-0 left-0 right-0 glassmorphism-strong rounded-b-3xl p-6 ${
                isDescriptionVisible ? '' : 'translate-y-full'
              }`}
              initial={false}
              animate={{ y: isDescriptionVisible ? 0 : '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-medium text-foreground">Our Story</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDescriptionVisible(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="button-hide-description"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-foreground leading-relaxed" data-testid="text-photo-description">
                {photo.description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

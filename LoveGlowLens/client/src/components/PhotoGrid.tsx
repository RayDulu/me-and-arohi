import { motion } from "framer-motion";
import PhotoCard from "./PhotoCard";
import type { Photo } from "@shared/schema";

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photoId: string) => void;
  isLoading: boolean;
}

export default function PhotoGrid({ photos, onPhotoClick, isLoading }: PhotoGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="glassmorphism rounded-3xl p-4">
            <div className="loading-shimmer rounded-2xl h-64 mb-4"></div>
            <div className="loading-shimmer rounded h-4 w-24 mb-2"></div>
            <div className="loading-shimmer rounded h-3 w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glassmorphism rounded-3xl p-12 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-foreground mb-4">No Photos Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start building your gallery by adding your first memory!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PhotoCard photo={photo} onClick={() => onPhotoClick(photo.id)} />
        </motion.div>
      ))}
    </motion.div>
  );
}

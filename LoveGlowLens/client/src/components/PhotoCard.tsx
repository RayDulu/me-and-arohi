import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Photo } from "@shared/schema";

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div 
      className="glassmorphism rounded-3xl p-4 image-container group cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-photo-${photo.id}`}
    >
      <div className="relative overflow-hidden rounded-2xl mb-4">
        {!imageLoaded && !imageError && (
          <div className="loading-shimmer w-full h-64 rounded-2xl" />
        )}
        
        {imageError ? (
          <div className="w-full h-64 bg-muted rounded-2xl flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Image failed to load</span>
          </div>
        ) : (
          <img
            src={photo.url}
            alt={photo.title}
            className={`w-full h-64 object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            data-testid={`img-photo-${photo.id}`}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground" data-testid={`text-date-${photo.id}`}>
            {formatDate(photo.date)}
          </p>
          {photo.location && (
            <p className="text-xs text-muted-foreground mt-1" data-testid={`text-location-${photo.id}`}>
              {photo.location}
            </p>
          )}
        </div>
        <Button
          size="sm"
          className="glassmorphism rounded-full w-8 h-8 p-0 hover:scale-110 transition-transform duration-200"
          onClick={(e) => {
            e.stopPropagation();
            // Could add favorite functionality here
          }}
          data-testid={`button-heart-${photo.id}`}
        >
          <Heart className="w-4 h-4 text-primary" />
        </Button>
      </div>
    </motion.div>
  );
}

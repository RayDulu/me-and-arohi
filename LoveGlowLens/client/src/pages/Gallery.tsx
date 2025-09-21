import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import PhotoGrid from "@/components/PhotoGrid";
import PhotoViewer from "@/components/PhotoViewer";
import AdminPanel from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, ArrowUp } from "lucide-react";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useTouch } from "@/hooks/useTouch";
import type { Photo } from "@shared/schema";

export default function Gallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const { data: photos = [], isLoading, refetch } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
  });

  const openViewer = (photoId: string) => {
    const index = photos.findIndex(p => p.id === photoId);
    if (index !== -1) {
      setCurrentPhotoIndex(index);
      setIsViewerOpen(true);
    }
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  const nextImage = () => {
    if (photos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const previousImage = () => {
    if (photos.length > 0) {
      setCurrentPhotoIndex((prev) => prev === 0 ? photos.length - 1 : prev - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation
  useKeyboard({
    ArrowLeft: () => isViewerOpen && previousImage(),
    ArrowRight: () => isViewerOpen && nextImage(),
    Escape: () => isViewerOpen && closeViewer(),
  });

  // Touch gestures
  useTouch({
    onSwipeLeft: () => isViewerOpen && nextImage(),
    onSwipeRight: () => isViewerOpen && previousImage(),
  });

  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-50">
        <nav className="glassmorphism fixed top-4 left-1/2 transform -translate-x-1/2 rounded-full px-8 py-4 z-50">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-foreground">Our Memories</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdminOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="button-add-photo"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="button-gallery-view"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Gallery
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Stats */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glassmorphism inline-block rounded-full px-6 py-3 mb-4">
              <p className="text-muted-foreground text-sm" data-testid="text-photo-count">
                {photos.length} Beautiful Memories
              </p>
            </div>
            <h2 className="text-4xl font-light text-foreground mb-2">Our Journey Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every moment captured tells a story of our love and adventures together.
            </p>
          </motion.div>

          {/* Photo Grid */}
          <PhotoGrid 
            photos={photos} 
            onPhotoClick={openViewer} 
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
        {isViewerOpen && currentPhoto && (
          <PhotoViewer
            photo={currentPhoto}
            currentIndex={currentPhotoIndex}
            totalPhotos={photos.length}
            onClose={closeViewer}
            onNext={nextImage}
            onPrevious={previousImage}
          />
        )}
      </AnimatePresence>

      {/* Admin Panel Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            onClose={() => setIsAdminOpen(false)}
            onSuccess={() => {
              setIsAdminOpen(false);
              refetch();
            }}
          />
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <Button
        className="fixed bottom-8 right-8 glassmorphism rounded-full w-14 h-14 hover:scale-110 transition-transform duration-200 z-40"
        onClick={scrollToTop}
        data-testid="button-scroll-top"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
}

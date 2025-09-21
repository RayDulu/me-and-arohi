import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertPhotoSchema, type InsertPhoto } from "@shared/schema";

interface AdminPanelProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminPanel({ onClose, onSuccess }: AdminPanelProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<InsertPhoto>({
    resolver: zodResolver(insertPhotoSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

  const addPhotoMutation = useMutation({
    mutationFn: async (data: InsertPhoto) => {
      const response = await apiRequest("POST", "/api/photos", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your memory has been added to the gallery.",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPhoto) => {
    addPhotoMutation.mutate(data);
  };

  const urlValue = form.watch("url");

  // Update preview when URL changes
  React.useEffect(() => {
    if (urlValue && urlValue.startsWith("http")) {
      setPreviewUrl(urlValue);
    } else {
      setPreviewUrl("");
    }
  }, [urlValue]);

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
      
      {/* Admin Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <motion.div
          className="glassmorphism-strong rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Add New Memory</h2>
            <Button
              variant="ghost"
              size="sm"
              className="glassmorphism rounded-full w-10 h-10 p-0 hover:scale-110 transition-transform duration-200"
              onClick={onClose}
              data-testid="button-close-admin"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image URL */}
            <div>
              <Label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
                Image URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="glassmorphism rounded-2xl border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                {...form.register("url")}
                data-testid="input-photo-url"
              />
              {form.formState.errors.url && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.url.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Memory Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="A beautiful day together..."
                className="glassmorphism rounded-2xl border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                {...form.register("title")}
                data-testid="input-photo-title"
              />
              {form.formState.errors.title && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="glassmorphism rounded-2xl border-0 focus:ring-2 focus:ring-primary text-foreground"
                {...form.register("date")}
                data-testid="input-photo-date"
              />
              {form.formState.errors.date && (
                <p className="text-destructive text-sm mt-1">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Where was this taken?"
                className="glassmorphism rounded-2xl border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                {...form.register("location")}
                data-testid="input-photo-location"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Your Story
              </Label>
              <Textarea
                id="description"
                rows={6}
                placeholder="Tell the story behind this beautiful moment..."
                className="glassmorphism rounded-2xl border-0 focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground resize-none"
                {...form.register("description")}
                data-testid="textarea-photo-description"
              />
            </div>

            {/* Preview */}
            <div className="glassmorphism rounded-2xl p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Preview</h3>
              <div className="glassmorphism rounded-xl p-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="bg-muted rounded-lg h-32 flex items-center justify-center mb-3">
                    <span className="text-muted-foreground text-sm">Image preview will appear here</span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  {form.watch("title") || "Memory preview"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground rounded-2xl py-3 font-medium hover:scale-105 transition-transform duration-200"
                disabled={addPhotoMutation.isPending}
                data-testid="button-save-photo"
              >
                <Save className="w-4 h-4 mr-2" />
                {addPhotoMutation.isPending ? "Saving..." : "Save Memory"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="glassmorphism rounded-2xl px-6 py-3 hover:scale-105 transition-transform duration-200"
                onClick={onClose}
                data-testid="button-cancel-admin"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

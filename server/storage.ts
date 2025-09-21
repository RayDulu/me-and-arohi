import { type Photo, type InsertPhoto } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPhoto(id: string): Promise<Photo | undefined>;
  getAllPhotos(): Promise<Photo[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  deletePhoto(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private photos: Map<string, Photo>;

  constructor() {
    this.photos = new Map();
  }

  async getPhoto(id: string): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = randomUUID();
    const photo: Photo = { 
      ...insertPhoto,
      description: insertPhoto.description || null,
      location: insertPhoto.location || null, 
      id,
      createdAt: new Date(),
    };
    this.photos.set(id, photo);
    return photo;
  }

  async deletePhoto(id: string): Promise<boolean> {
    return this.photos.delete(id);
  }
}

export const storage = new MemStorage();

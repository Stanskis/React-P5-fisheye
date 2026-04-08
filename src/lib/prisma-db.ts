import { PrismaClient } from '@prisma/client';
import { IPhotographer } from '@/types/photographer.types';
import { IPhoto, TId } from '@/types/media.types';

const prisma = new PrismaClient();

export const getAllPhotographers = (): Promise<IPhotographer[]> =>
  prisma.photographer.findMany();

export const getPhotographer = async (id: TId): Promise<IPhotographer | null> =>
  prisma.photographer.findUnique({
    where: { id },
  });

export const getAllMediasForPhotographer = async (
  photographerId: TId,
): Promise<IPhoto[]> =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const updateNumberOfLikes = (mediaId: TId, newNumberOfLikes: number) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });

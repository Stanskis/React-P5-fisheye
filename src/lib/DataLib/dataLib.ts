import { IPhotographer } from '@/types/photographer.types';
import { TId, IPhoto } from '@/types/media.types';
import {
  getAllPhotographers,
  getPhotographer,
  getAllMediasForPhotographer,
} from '../prisma-db';

type TDataResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export async function allPhotographers(): Promise<
  TDataResult<IPhotographer[]>
> {
  try {
    // throw new Error('Simulated error fetching photographers'); // Simulate an error
    const photographers = await getAllPhotographers();
    return { success: true, data: photographers };
  } catch (error) {
    console.error('Error fetching photographers:', error);
    return { success: false, error: 'Failed to fetch photographers' };
  }
}

export async function getPhotographerById(
  id: TId,
): Promise<TDataResult<IPhotographer>> {
  try {
    const photographer = await getPhotographer(id);
    if (!photographer) {
      return { success: false, error: 'Photographer not found' };
    }
    return { success: true, data: photographer };
  } catch (e) {
    console.error('getPhotographerById', e);
    return { success: false, error: 'Failed to fetch photographer' };
  }
}

export async function getPhotographerMediaById(
  photographerId: TId,
): Promise<TDataResult<IPhoto[]>> {
  try {
    const photos = await getAllMediasForPhotographer(photographerId);
    return { success: true, data: photos };
  } catch (e) {
    console.error('getPhotographerMediaById', e);
    return { success: false, error: 'Failed to fetch photos' };
  }
}

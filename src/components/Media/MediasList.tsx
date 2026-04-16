import { getPhotographerMediaById } from '../../lib/DataLib/dataLib';
import type { TId } from '@/types/media.types';
import MediaGalleryClient from './MediaGalleryClient';
import PhotographerStats from '../Photographers/PhotographerStats';

interface MediasListProps {
  photographerId: TId;
  price: number;
}

export default async function MediasList({ photographerId, price }: MediasListProps) {
  const result = await getPhotographerMediaById(photographerId);

  if (!result.success) {
    return (
      <p className="border text-red-500 p-4 bg-red-50 rounded-lg h-full text-center my-8">
        {result.error}
      </p>
    );
  }
  const totalLikes = result.data.reduce((acc, media) => acc + media.likes, 0);

  return (
    <>
      <MediaGalleryClient medias={result.data} />
      <PhotographerStats totalLikes={totalLikes} price={price} />
    </>
  );
}

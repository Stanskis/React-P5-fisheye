import { getPhotographerMediaById } from '../../lib/DataLib/dataLib';
import type { TId } from '@/types/media.types';
import MediaGalleryClient from './MediaGalleryClient';

interface MediasListProps {
  photographerId: TId;
}

export default async function MediasList({ photographerId }: MediasListProps) {
  const result = await getPhotographerMediaById(photographerId);

  if (!result.success) {
    return <div className="text-red-500">Error...</div>;
  }

  return <MediaGalleryClient medias={result.data} />;
}

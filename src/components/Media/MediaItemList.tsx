import { getPhotographerMediaById } from '../../lib/DataLib/dataLib';
import type { TId } from '@/types/media.types';
import MediaItem from './MediaItem';

interface MediasListProps {
  photographerId: TId;
}

export default async function MediasList({ photographerId }: MediasListProps) {
  const result = await getPhotographerMediaById(photographerId);

  if (!result.success) {
    return (
      <div className="border text-red-500 p-4 bg-red-50 rounded-lg w-1/2 h-full text-center my-8">
        <p>{result.error}</p>
      </div>
    );
  }

  const medias = result.data.filter((m) => m.image || m.video);

  if (medias.length === 0) {
    return (
      <div className="text-gray-500 py-12 text-center w-full">
        <p>No media found for this photographer.</p>
      </div>
    );
  }

  return (
    <section className="gallery mt-8">
      <div className="flex justify-start items-center font-bold text-sm gap-4 mb-6">
        <p className="font-bold text-sm">Trier par</p>
        <select className="p-2 rounded-lg primaire-bg">
          <option value="popularity" className="primaire-bg">
            Popularité
          </option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-items-center">
        {medias.map((m) => (
          <MediaItem key={m.id} media={m} />
        ))}
      </div>
    </section>
  );
}

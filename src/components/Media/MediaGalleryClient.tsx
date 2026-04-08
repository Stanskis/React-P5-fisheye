'use client';
import { useState, useMemo } from 'react';
import MediaItem from './MediaItem';
import type { IMedia } from '@/types/media.types';

interface MediaGalleryClientProps {
  medias: IMedia[];
}

export default function MediaGalleryClient({
  medias = [],
}: MediaGalleryClientProps) {
  const [sortBy, setSortBy] = useState<string>('popularity');

  const sortedMedias = useMemo(() => {
    const items = [...medias];

    if (sortBy === 'date') {
      return items.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
    if (sortBy === 'title') {
      return items.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'popularity') {
      return items.sort((a, b) => b.likes - a.likes);
    }
    return items;
  }, [sortBy, medias]);

  if (medias.length === 0) {
    return (
      <div className="text-gray-500 py-12 text-center italic">
        No media found for this photographer.
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col my-6">
      <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start mb-6">
        <label htmlFor="sort" className="text-sm font-bold">
          Trier par
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md p-2 text-sm font-bold primaire-bg shadow-sm"
        >
          <option value="popularity">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-items-center">
        {sortedMedias.map((media) => (
          <MediaItem key={media.id} media={media} />
        ))}
      </div>
    </section>
  );
}

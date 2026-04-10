'use client';
import { useState } from 'react';
import MediaItem from './MediaItem';
import MediaFilters from '../MediaFilters/MediaFilters';
import type { IMedia } from '@/types/media.types';
import Lightbox from '../Modals/Lightbox';

export default function Gallery({ medias }: { medias: IMedia[] }) {
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedMedia, setSelectedMedia] = useState<IMedia | null>(null);

  const sortedMedias = [...medias].sort((a, b) => {
    if (sortBy === 'popularity') return Number(b.likes) - Number(a.likes);
    if (sortBy === 'date')
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <section className="w-full flex flex-col my-6">
      <MediaFilters sortBy={sortBy} onSortChange={setSortBy} />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full justify-items-center">
        {sortedMedias.map((media) => (
          <MediaItem
            key={media.id}
            media={media}
            onSelect={() => setSelectedMedia(media)}
          />
        ))}
      </div>

      {selectedMedia && (
        <Lightbox
          mediaList={sortedMedias}
          currentIndex={sortedMedias.indexOf(selectedMedia)}
          onClose={() => setSelectedMedia(null)}
          onChange={(index) => setSelectedMedia(sortedMedias[index])}
        />
      )}
    </section>
  );
}

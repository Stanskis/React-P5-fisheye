import type { IMedia } from '@/types/media.types';
import Image from 'next/image';

export default function MediaItem({ media }: { media: IMedia }) {
  const isVideo = Boolean(media.video);
  const src = isVideo
    ? `/${media.video}`
    : `/${media.image ?? 'placeholder.png'}`;

  return (
    <div className="w-[350px] h-[350px] flex flex-col rounded-md overflow-hidden">
      <div className="relative w-full h-[350px] rounded-md overflow-hidden">
        {isVideo ? (
          <video
            src={src}
            className="w-full h-full object-cover cursor-pointer"
            controls
          />
        ) : (
          <Image
            src={src}
            alt={media.title || 'Media content'}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex justify-between items-center px-1 py-3">
        <h4 className="font-medium truncate pr-2 text-gray-800">
          {media.title || 'No title'}
        </h4>
        <p className="text-sm text-gray-600 flex items-center gap-1 shrink-0">
          {media.likes}{' '}
          <span role="img" aria-label="likes">
            ❤
          </span>
        </p>
      </div>
    </div>
  );
}

import type { IMedia } from '@/types/media.types';
import Image from 'next/image';

interface MediaItemProps {
  media: IMedia;
  onSelect: (media: IMedia) => void;
}

const getSrc = (media: IMedia): string => {
  if (media.video) return `/${media.video}`;
  return `/${media.image ?? 'placeholder.png'}`;
};

export default function MediaItem({ media, onSelect }: MediaItemProps) {
  const isVideo = Boolean(media.video);
  const src = getSrc(media);

  return (
    <div className="w-[350px] flex flex-col rounded-md overflow-hidden">
      <div
        className="relative w-full h-[350px] rounded-md overflow-hidden cursor-pointer"
        onClick={() => onSelect(media)}
      >
        {isVideo ? (
          <video
            src={src}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <Image
            src={src}
            alt=""
            loading="eager"
            fill
            sizes="(max-width: 350px)"
            className="object-cover object-top"
          />
        )}
      </div>
      <div className="flex justify-between items-center primaire-text py-3">
        <h3 className="truncate">{media.title || 'No title'}</h3>
        <p className="text-sm flex items-center gap-1 shrink-0">
          {media.likes}{' '}
          <span role="img" aria-label="likes" className="text-xl">
            ❤
          </span>
        </p>
      </div>
    </div>
  );
}

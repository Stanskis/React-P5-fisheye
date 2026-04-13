import { IMedia } from '@/types/media.types';
import { useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  mediaList: IMedia[];
  currentIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function Lightbox({
  mediaList,
  currentIndex,
  onClose,
  onChange,
}: LightboxProps) {
  const media = mediaList[currentIndex];

  const handleNext = () => {
    onChange((currentIndex + 1) % mediaList.length);
  };

  const handlePrev = () => {
    onChange((currentIndex - 1 + mediaList.length) % mediaList.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visionnaire de la galerie"
    >
      <div
        className="relative w-[1350px] flex flex-col items-center primaire-text"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-8xl text-semibold z-[10] transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Fermer"
        >
          &times;
        </button>
        <button
          className="absolute -left-2 top-1/2 -translate-y-1/2 text-9xl z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Image précédente"
        >
          ‹
        </button>
        <button
          className="absolute -right-2 top-1/2 -translate-y-1/2 text-9xl z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Image suivante"
        >
          ›
        </button>

        <div className="relative mt-2 w-[1000px] h-[950px] flex items-center justify-center">
          {media.video ? (
            <video
              src={`/${media.video}`}
              className="w-full h-full object-cover object-top rounded-sm shadow-2xl"
              controls
            />
          ) : (
            <Image
              src={media.image ? `/${media.image}` : '/placeholder.png'}
              alt=""
              fill
              className="object-cover object-[center_25%] rounded-sm shadow-2xl"
            />
          )}
        </div>
        <div className="w-[1000px] mt-4 text-left">
          <h3 className="text-xl ">{media.title}</h3>
        </div>
      </div>
    </div>
  );
}

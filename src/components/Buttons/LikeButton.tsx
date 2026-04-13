'use client';
import Heart from '../svg/heart';
import { useState, useRef } from 'react';
import { toggleLikeAction } from '@/lib/Server/actions';
import { TId } from '@/types/media.types';

const COOLDOWN_TIME = 1000 * 20 * 60; // 20 minutes

export default function LikeButton({
  mediaId,
  initLikes,
}: {
  mediaId: TId;
  initLikes: number;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initLikes);
  const lastLikedTime = useRef<number>(0);

  const handleLikes = async () => {
    const newLiked = !isLiked;
    // Cooldown
    if (newLiked) {
      const now = Date.now();
      if (now - lastLikedTime.current < COOLDOWN_TIME) {
        return;
      }
      lastLikedTime.current = now;
    }

    setIsLiked(newLiked);
    setLikes(newLiked ? likes + 1 : likes - 1);

    const result = await toggleLikeAction(mediaId, newLiked);

    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.error);
      // Rollback
      setIsLiked(isLiked);
      setLikes(likes);
    }
  };

  return (
    <button
      className="text-sm flex items-center gap-1 shrink-0 cursor-pointer"
      onClick={handleLikes}
      aria-label={`${likes} likes, ${isLiked ? 'retirer le like' : 'ajouter un like'}`}
    >
      {likes}
      <Heart />
    </button>
  );
}

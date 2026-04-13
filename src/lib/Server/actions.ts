'use server';

import { toggleLikeCount } from '@/lib/DataLib/dataLib';
import { TId } from '@/types/media.types';

export async function toggleLikeAction(mediaId: TId, liked: boolean) {
  return await toggleLikeCount(mediaId, liked);
}

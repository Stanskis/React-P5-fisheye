'use server';

import { toggleLikeCount } from '@/lib/DataLib/dataLib';
import { TId } from '@/types/media.types';

type TActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

export async function toggleLikeAction(
  mediaId: TId,
  liked: boolean,
): Promise<TActionResult> {
  const result = await toggleLikeCount(mediaId, liked);

  if (result.success) {
    return { success: true, message: 'Likes updated successfully' };
  }

  return { success: false, error: result.error };
}

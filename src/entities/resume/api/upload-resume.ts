import { fetch } from '@shared/api';

export async function uploadThumbnail({ resumeId, thumbnail }: { resumeId: string; thumbnail: string }) {
  return fetch(`resume/${resumeId}/thumbnail`, {
    options: {
      method: 'POST',
      body: JSON.stringify({
        base64: thumbnail,
      }),
    },
  });
}

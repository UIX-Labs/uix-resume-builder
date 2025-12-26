import { fetch } from '@shared/api';

export interface UploadProfilePictureResponse {
  url: string;
}

export async function uploadProfilePicture({
  base64,
  personalDetailItemId,
}: {
  base64: string;
  personalDetailItemId: string;
}): Promise<UploadProfilePictureResponse> {
  return fetch<UploadProfilePictureResponse>('personal-detail-items/upload-profile-picture', {
    options: { method: 'POST', body: JSON.stringify({ base64, personalDetailItemId }) },
  });
}

import { uploadProfilePicture } from '@entities/resume/api/upload-profile-picture';
import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/components/button';
import { Input } from '@shared/ui/components/input';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const ProfilePictureInput = ({
  data,
  onChange,
  personalDetailItemId,
}: {
  data?: { profilePicturePublicUrl?: string };
  onChange: (data: { profilePicturePublicUrl: string }) => void;
  personalDetailItemId: string;
  section: any;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(data?.profilePicturePublicUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.profilePicturePublicUrl !== imageUrl) {
      setImageUrl(data?.profilePicturePublicUrl || '');
    }
  }, [data?.profilePicturePublicUrl]);

  useEffect(() => {
    if (imageUrl) {
      onChange({ profilePicturePublicUrl: imageUrl });
    }
  }, [imageUrl]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const base64 = await convertToBase64(file);

      const response = await uploadProfilePicture({
        personalDetailItemId,
        base64,
      });

      if (response) {
        setImageUrl(response.url);
      } else {
        const errorMsg = 'Failed to upload image - API returned success: false';
        console.error(errorMsg, response);
        setError(errorMsg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDelete = async () => {
    try {
      setIsUploading(true);
      setError(null);

      await uploadProfilePicture({
        personalDetailItemId,
        base64: '',
      });

      setImageUrl('');
      onChange({ profilePicturePublicUrl: '' });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Failed to delete profile picture:', err);
      setError('Failed to delete profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        className={cn(
          'relative border-2 border-dashed rounded-[8px] p-4 h-auto',
          'flex flex-col items-center justify-center',
          isDragging ? 'border-[#0059ED] bg-[#CBE7FF]' : 'border-[#959DA8] bg-[#FAFBFC]',
        )}
        onClick={() => !isUploading && !imageUrl && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isUploading}
      >
        {imageUrl ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image src={imageUrl} alt="Profile" fill className="object-cover" unoptimized />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange();
                }}
                disabled={isUploading}
                className="bg-[#E9F4FF] text-[#005FF2] border-[#CBE7FF] hover:bg-[#005FF2] hover:text-white"
              >
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isUploading}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-[#0C1118] font-semibold mb-1">
              {isUploading ? 'Uploading...' : 'Upload Profile Picture'}
            </div>
            <div className="text-sm text-[#959DA8]">Click or drag and drop an image here</div>
            <div className="text-xs text-[#959DA8] mt-1">Max size: 5MB</div>
          </div>
        )}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

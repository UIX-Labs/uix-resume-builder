import { cn } from '@shared/lib/cn';
import { uploadProfilePicture } from '@entities/resume/api/upload-profile-picture';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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
  const [imageUrl, setImageUrl] = useState<string>(data?.profilePicturePublicUrl ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDelete = () => {
    setImageUrl('');
    onChange({ profilePicturePublicUrl: '' });
    setError(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={cn(
          'relative border-2 border-dashed rounded-[8px] p-4 transition-colors',
          'flex flex-col items-center justify-center cursor-pointer',
          isDragging ? 'border-[#0059ED] bg-[#CBE7FF]' : 'border-[#959DA8] bg-[#FAFBFC]',
          isUploading && 'opacity-50 cursor-not-allowed',
        )}
        onClick={() => !isUploading && !imageUrl && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageUrl ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image src={imageUrl} alt="Profile" fill className="object-cover" unoptimized />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange();
                }}
                disabled={isUploading}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                  'bg-[#E9F4FF] text-[#005FF2] border border-[#CBE7FF]',
                  'hover:bg-[#005FF2] hover:text-white',
                  isUploading && 'opacity-50 cursor-not-allowed'
                )}
              >
                Change
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isUploading}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                  'bg-red-50 text-red-600 border border-red-200',
                  'hover:bg-red-600 hover:text-white',
                  isUploading && 'opacity-50 cursor-not-allowed'
                )}
              >
                Delete
              </button>
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

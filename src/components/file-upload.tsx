'use client';

import axios from 'axios';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { UploadDropzone } from '@/lib/uploadthing';

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: 'serverImage' | 'messageFile';
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split('.').pop();
  const fileId = value?.split('/').pop();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/uploadthing/${fileId}`);
      onChange('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          width={80}
          height={80}
          src={value}
          alt="Upload server image"
          className="rounded-full"
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          onClick={onDelete}
          type="button"
          disabled={isLoading}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={onDelete}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
          disabled={isLoading}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
};

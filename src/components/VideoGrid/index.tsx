'use client';

import React, { useState } from 'react';
import { VideoItem } from '@/models';
import VideoCard from '@/components/VideoCard';
import { Zap } from 'lucide-react';
import VideoSkeleton from '../VideoCard/Skeleton';

interface VideoGridProps {
  videos: VideoItem[];
  loading?: boolean;
  isAiMode?: boolean;
}

const VideoGrid: React.FC<
  VideoGridProps
> = ({
  videos,
  loading = false,
  isAiMode = false,
}) => {
  const [largeThumbnails] =
    useState(false);

  const gridClass = largeThumbnails
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4';

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 10 }).map(
          (_, i) => (
            <VideoSkeleton key={i} />
          ),
        )}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className='flex h-96 w-full flex-col items-center justify-center text-gray-500 border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl bg-white/30 dark:bg-white/5'>
        <p className='text-xl font-semibold mb-2'>
          Oops! Nothing here.
        </p>
        <p className='text-sm'>
          Try searching for another
          term. or category.
        </p>
      </div>
    );
  }

  return (
    <div>
      {isAiMode && (
        <div className='mb-4 text-sm text-purple-400 flex items-center gap-1'>
          <Zap className='w-4 h-4' />
          AI-generated content can be
          displayed.
        </div>
      )}

      <div className={gridClass}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
          />
        ))}
      </div>

      {!loading &&
        videos.length > 0 && (
          <div className='mt-16 flex flex-col items-center justify-center gap-4 text-gray-400'>
            <div className='h-1 w-24 bg-gray-300 dark:bg-white/10 rounded-full' />
            <p className='text-xs uppercase tracking-widest'>
              End of results
            </p>
          </div>
        )}
    </div>
  );
};

export default VideoGrid;

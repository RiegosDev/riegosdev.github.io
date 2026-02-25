'use client';

import { useState } from 'react';
import { VideoItem } from '@/models';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({
  video,
}: VideoCardProps) {
  const [isHovered, setIsHovered] =
    useState(false);

  return (
    <Link
      href={`/out/${video.slug}`}
      target='_blank'
      rel='noopener noreferrer'
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      // 🚀 REFACTOR SÊNIOR: z-0 prende ele na base. hover:z-20 destaca apenas entre os irmãos.
      className='group relative z-0 hover:z-20 flex flex-col gap-2 cursor-pointer'>
      {/* Container da Thumbnail */}
      <div
        className={clsx(
          'relative aspect-video w-full overflow-hidden rounded-lg',
          // 🚀 transform-gpu impede que a animação quebre o z-index nativo
          'bg-slate-200 dark:bg-dark-800 shadow-md transition-all duration-300 transform-gpu',
          'group-hover:shadow-xl group-hover:ring-2 group-hover:ring-rose-500/50',
        )}>
        <Image
          src={
            video.thumbnail ||
            '/sex_default_thumb.png'
          }
          alt={video.title}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className={clsx(
            'object-cover transition-transform duration-500',
            isHovered && 'scale-110',
          )}
        />

        {/* Overlay de Play */}
        <div
          className={clsx(
            'absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 z-10',
            isHovered
              ? 'opacity-100'
              : 'opacity-0',
          )}>
          <div className='rounded-full bg-rose-500 p-3 shadow-lg shadow-rose-500/40'>
            <Play className='w-6 h-6 text-white fill-white' />
          </div>
        </div>

        {/* Badge de Duração (z-20 para ficar acima do overlay preto de hover) */}
        <div className='absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white z-20'>
          {video.duration}
        </div>
      </div>

      {/* Info do Vídeo */}
      <div className='flex flex-col px-1'>
        <h3
          className={clsx(
            'line-clamp-2 text-sm font-bold transition-colors leading-tight',
            'text-gray-900 dark:text-gray-100 group-hover:text-rose-500',
          )}>
          {video.title}
        </h3>
        <div className='mt-1 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400'>
          <span className='font-semibold uppercase tracking-wider'>
            {video.source}
          </span>
          <span>
            {video.views} views
          </span>
        </div>
      </div>
    </Link>
  );
}

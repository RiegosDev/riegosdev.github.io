'use client';

import { useState } from 'react';
import { VideoItem } from '@/models';
import { Play } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
// 🚀 Importando a sua mina de ouro!
import { CPM_REPOSITORY } from '@/repositories/cpm.repository';

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({
  video,
}: VideoCardProps) {
  const [isHovered, setIsHovered] =
    useState(false);

  // Fallback de segurança
  const targetLink =
    video.externalUrl || '#';

  // 🚀 O BOTE DUPLO DO TRAFFIC BROKER
  const handleVideoClick = () => {
    // Dá um tempinho de 200ms para o navegador focar na aba do vídeo novo que abriu
    setTimeout(() => {
      // Redireciona a aba original para o Direct Link da Adsterra (o primeiro do array)
      window.location.href =
        CPM_REPOSITORY.globalScripts[0].src;
    }, 200);
  };

  return (
    <a
      href={targetLink}
      target='_blank'
      rel='noopener noreferrer nofollow'
      onClick={handleVideoClick} // 🚀 Gatilho da monetização ativado!
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      className='group relative flex flex-col gap-2 cursor-pointer'>
      <div
        className={clsx(
          'relative aspect-video w-full overflow-hidden rounded-lg',
          'bg-slate-200 dark:bg-dark-800 shadow-md transition-all duration-300',
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

        <div
          className={clsx(
            'absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300',
            isHovered
              ? 'opacity-100'
              : 'opacity-0',
          )}>
          <div className='rounded-full bg-rose-500 p-3 shadow-lg shadow-rose-500/40'>
            <Play className='w-6 h-6 text-white fill-white' />
          </div>
        </div>

        {/* Badge de tempo */}
        <div className='absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white z-10'>
          {video.duration}
        </div>
      </div>

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
    </a>
  );
}

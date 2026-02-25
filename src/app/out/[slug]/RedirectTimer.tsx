'use client';
import {
  useState,
  useEffect,
} from 'react';

export default function RedirectTimer({
  targetUrl,
}: {
  targetUrl: string;
}) {
  const [timeLeft, setTimeLeft] =
    useState(5);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(
      () => setTimeLeft((t) => t - 1),
      1000,
    );
    return () =>
      clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className='flex flex-col items-center gap-4'>
      {timeLeft > 0 ? (
        <button
          disabled
          className='bg-zinc-800/50 text-zinc-500 font-black py-4 px-12 rounded-lg border border-zinc-700 cursor-not-allowed uppercase tracking-tighter text-xl'>
          Aguarde {timeLeft}s...
        </button>
      ) : (
        <a
          href={targetUrl}
          rel='nofollow noopener noreferrer'
          className='bg-rose-600 hover:bg-rose-700 text-white font-black py-4 px-12 rounded-lg transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] uppercase tracking-tighter text-2xl animate-bounce'>
          Skip Ad &gt;
        </a>
      )}
      <p className='text-[10px] text-zinc-500 uppercase tracking-widest'>
        O vídeo será aberto em uma nova
        guia
      </p>
    </div>
  );
}

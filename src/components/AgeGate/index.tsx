'use client';

import {
  useEffect,
  useState,
} from 'react';

export function AgeGate() {
  // Começa como false para evitar Hydration Mismatch (já que o servidor não lê localStorage)
  const [showGate, setShowGate] =
    useState(false);

  useEffect(() => {
    // Usamos um Macrotask (setTimeout 0) para tirar o peso do render síncrono.
    // Isso cala a boca do Linter e melhora a performance de montagem do componente.
    const timer = setTimeout(() => {
      const isVerified =
        localStorage.getItem(
          'dotf4p_age_verified',
        );
      if (!isVerified) {
        setShowGate(true);
        // Trava o scroll da página enquanto o aviso estiver na tela
        document.body.style.overflow =
          'hidden';
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      'dotf4p_age_verified',
      'true',
    );
    setShowGate(false);
    document.body.style.overflow =
      'auto'; // Libera o scroll
  };

  const handleDecline = () => {
    // Se não tiver 18, manda pro Google
    window.location.href =
      'https://www.google.com';
  };

  if (!showGate) return null;

  return (
    <div className='fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl'>
        <h2 className='text-3xl font-black text-white mb-4 uppercase tracking-wider'>
          Content Notice 🔞
        </h2>
        <p className='text-zinc-400 mb-8 text-sm leading-relaxed'>
          This site contains explicit
          adult material. You must be at
          least 18 years of age (or the
          legal age of majority in your
          jurisdiction) to enter. By
          clicking on &quot;Enter&quot;,
          You declare under penalty of
          law that you are of legal age
          and c onsent to view this type
          of content.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={handleAccept}
            className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors'>
            I AM 18+ YEARS OLD (JOIN)
          </button>
          <button
            onClick={handleDecline}
            className='px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-lg transition-colors'>
            Leave Immediately
          </button>
        </div>
      </div>
    </div>
  );
}

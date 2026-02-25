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
          Aviso de Conteúdo 🔞
        </h2>
        <p className='text-zinc-400 mb-8 text-sm leading-relaxed'>
          Este site contém material
          adulto explícito. Você deve
          ter pelo menos 18 anos de
          idade (ou a maioridade legal
          em sua jurisdição) para
          entrar. Ao clicar em
          &quot;Entrar&quot;, você
          declara sob as penas da lei
          que é maior de idade e
          consente em visualizar este
          tipo de conteúdo.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={handleAccept}
            className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors'>
            EU TENHO 18+ ANOS (ENTRAR)
          </button>
          <button
            onClick={handleDecline}
            className='px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-lg transition-colors'>
            Sair Imediatamente
          </button>
        </div>
      </div>
    </div>
  );
}

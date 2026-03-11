'use client';
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import {
  Info,
  Check,
} from 'lucide-react'; // Ícones novos importados!

export default function CalculadoraRampa() {
  const [mode, setMode] = useState<
    'inclination' | 'length' | 'height'
  >('inclination');
  const [h, setH] = useState('');
  const [c, setC] = useState('');
  const [i, setI] = useState('');
  const [showHelp, setShowHelp] =
    useState(false); // Estado do nosso Modal Dialog

  const calculateResult = () => {
    const numH = parseFloat(h) || 0;
    const numC = parseFloat(c) || 0;
    const numI = parseFloat(i) || 0;

    if (
      mode === 'inclination' &&
      numH > 0 &&
      numC > 0
    )
      return (
        (numH * 100) /
        numC
      ).toFixed(2);
    if (
      mode === 'length' &&
      numH > 0 &&
      numI > 0
    )
      return (
        (numH * 100) /
        numI
      ).toFixed(2);
    if (
      mode === 'height' &&
      numC > 0 &&
      numI > 0
    )
      return (
        (numI * numC) /
        100
      ).toFixed(2);
    return '0.00';
  };

  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-lg mx-auto space-y-12'>
        {/* Título com o ícone de Instruções */}
        <div className='text-center flex flex-col items-center justify-center relative'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
              Calculadora NBR 9050
            </h1>
            <button
              onClick={() =>
                setShowHelp(true)
              }
              className='text-emerald-500 hover:text-emerald-400 hover:scale-110 transition-all focus:outline-none'
              title='Como usar a calculadora'>
              <Info className='w-6 h-6' />
            </button>
          </div>
          <p className='text-muted-foreground mt-2'>
            Ferramenta open-source by
            Riegos.dev
          </p>
        </div>

        <div className='glass-card p-6 md:p-8 rounded-3xl bg-card border-border shadow-2xl relative z-10'>
          {/* Tabs */}
          <div className='flex bg-muted/50 p-1 rounded-xl mb-8'>
            {[
              {
                id: 'inclination',
                label: 'Inclinação (i)',
              },
              {
                id: 'length',
                label:
                  'Comprimento (c)',
              },
              {
                id: 'height',
                label: 'Altura (h)',
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  // eslint-disable-next-line
                  setMode(tab.id as any)
                }
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === tab.id ? 'bg-background shadow text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className='space-y-4'>
            {mode !== 'height' && (
              <div>
                <label className='block text-sm font-semibold text-muted-foreground mb-1'>
                  Desnível (h) em metros
                </label>
                <input
                  type='number'
                  step='0.01'
                  value={h}
                  onChange={(e) =>
                    setH(e.target.value)
                  }
                  className='w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
                  placeholder='Ex: 0.50'
                />
              </div>
            )}
            {mode !== 'length' && (
              <div>
                <label className='block text-sm font-semibold text-muted-foreground mb-1'>
                  Comprimento (c) em
                  metros
                </label>
                <input
                  type='number'
                  step='0.01'
                  value={c}
                  onChange={(e) =>
                    setC(e.target.value)
                  }
                  className='w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
                  placeholder='Ex: 6.00'
                />
              </div>
            )}
            {mode !== 'inclination' && (
              <div>
                <label className='block text-sm font-semibold text-muted-foreground mb-1'>
                  Inclinação (i) em %
                </label>
                <input
                  type='number'
                  step='0.01'
                  value={i}
                  onChange={(e) =>
                    setI(e.target.value)
                  }
                  className='w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
                  placeholder='Ex: 8.33'
                />
              </div>
            )}
          </div>

          {/* Result */}
          <div className='mt-8 p-6 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl'>
            <p className='text-emerald-600 dark:text-emerald-400 font-semibold text-sm'>
              Resultado
            </p>
            <p className='text-4xl font-black text-foreground mt-1'>
              {calculateResult()}{' '}
              {mode === 'inclination'
                ? '%'
                : 'm'}
            </p>
          </div>
        </div>
      </div>
      <div className='relative z-10'>
        <Footer />
      </div>

      {/* DIALOG DE INSTRUÇÕES (Custom Modal) */}
      {showHelp && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-background/60 transition-opacity'>
          <div className='glass-card p-8 rounded-3xl bg-card border-emerald-500/30 max-w-md w-full shadow-2xl shadow-emerald-900/20 transform transition-all scale-100'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30'>
                <Info className='w-5 h-5 text-emerald-500' />
              </div>
              <h3 className='text-xl font-bold text-foreground'>
                Instruções de uso:
              </h3>
            </div>

            <ul className='space-y-4 text-sm text-muted-foreground mb-8'>
              <li>
                <strong className='text-foreground text-center p-35 items-center justify-items-center'>
                  ⚠️ NBR 9050: ⚠️
                  <br /> <br />
                </strong>{' '}
                Para rampas acessíveis,
                é necessário o respeito
                de inclinações máximas e
                desnível máximo por
                segmento de rampa.
                <br />
                <br />
              </li>
              <li>
                <strong className='text-foreground'>
                  Instruções de uso:
                </strong>{' '}
                <br />
                <br />
              </li>
              <li>
                <strong className='text-foreground'>
                  Inclinação: (i)
                  <br />
                </strong>{' '}
                <b>
                  Dados que já temos:
                  <br />
                </b>
                Altura a subir,
                comprimento disponível
                ou se está sendo
                projetado. <br />
                <b>Resultado:</b>
                <br />
                Inclinação (%) final da
                rampa.
              </li>
              <li>
                <strong className='text-foreground'>
                  Comprimento: (c)
                  <br />
                </strong>{' '}
                <b>
                  Dados que já temos:
                  <br />
                </b>
                Altura a subir,
                inclinação máxima
                permitida. <br />
                <b>Resultado:</b>
                <br />
                Comprimento da rampa.
              </li>
              <li>
                <strong className='text-foreground'>
                  Altura (h -
                  (Desnível)):
                  <br />
                </strong>{' '}
                <b>
                  Dados que já temos:
                  <br />
                </b>
                Limite ou desejo de
                comprimento da rampa,
                inclinação máxima
                permitida.
                <br />
                <b>Resultado:</b>
                <br />
                Altura que ela alcança.
              </li>
            </ul>

            <button
              onClick={() =>
                setShowHelp(false)
              }
              className='w-full bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]'>
              <Check className='w-5 h-5' />{' '}
              Tudo certo!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

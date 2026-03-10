'use client';
import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

export default function CalculadoraRampa() {
  const [mode, setMode] = useState<
    'inclination' | 'length' | 'height'
  >('inclination');
  const [h, setH] = useState('');
  const [c, setC] = useState('');
  const [i, setI] = useState('');

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
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased bg-background'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-lg mx-auto space-y-12'>
        <div className='text-center'>
          <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
            Calculadora NBR 9050
          </h1>
          <p className='text-muted-foreground mt-2'>
            Ferramenta open-source by
            Riegos.dev (Daniel e Tiago
            Riêgo)
          </p>
        </div>

        <div className='glass-card p-6 md:p-8 rounded-3xl bg-card border-border shadow-2xl'>
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
                label: 'Desnível (h)',
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
    </main>
  );
}

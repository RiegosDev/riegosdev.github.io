// src/app/admin/login/page.tsx
'use client';

import { loginAction } from '@/actions/auth.actions';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { useState } from 'react';
import {
  Eye,
  EyeOff,
} from 'lucide-react'; // 🚀 Importando os olhinhos

export default function LoginPage() {
  const [error, setError] =
    useState('');
  const [
    showPassword,
    setShowPassword,
  ] = useState(false); // 🚀 Controle do olhinho

  async function handleSubmit(
    formData: FormData,
  ) {
    const res =
      await loginAction(formData);
    if (res?.error) setError(res.error);
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center p-40 px-4'>
      <div className='bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-2xl w-full max-w-sm'>
        <h1 className='text-xl font-black text-gray-900 dark:text-white mb-8 text-center uppercase tracking-widest'>
          Admin Access
        </h1>

        <form
          action={handleSubmit}
          className='flex flex-col gap-6'>
          {/* Usuário continua usando seu componente padrão */}
          <InputText
            labelText='Usuário'
            name='username'
            placeholder='Seu user'
          />

          {/* 🚀 Input de Senha Customizado com o Olhinho */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-bold text-gray-700 dark:text-gray-300 ml-1'>
              Senha
            </label>
            <div className='relative w-full'>
              <input
                name='password'
                // A mágica acontece aqui: se for true, mostra texto. Se falso, mostra bolinhas.
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder='Sua senha'
                className='w-full rounded-xl border border-gray-300/80 bg-white/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-rose-500 focus:ring-1 focus:ring-rose-500 dark:border-white/10 dark:bg-black/20 dark:text-white'
              />
              <button
                type='button'
                onClick={() =>
                  setShowPassword(
                    !showPassword,
                  )
                }
                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-rose-500 transition-colors'>
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className='text-rose-500 text-xs text-center font-bold bg-rose-500/10 py-2 rounded-lg'>
              {error}
            </p>
          )}

          <div className='mt-2'>
            <Button
              variant='default'
              type='submit'
              size='md'
              className='w-full'>
              Entrar no Painel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

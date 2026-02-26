'use client';

import { logoutAction } from '@/actions/auth.actions';
import { LogOut } from 'lucide-react'; // Supondo que você use lucide-react

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutAction()}
      className='flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded font-bold transition-all border border-red-500/30'>
      <LogOut size={18} />
      Sair do Painel
    </button>
  );
}

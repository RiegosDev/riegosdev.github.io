'use client';

import QRCode from 'react-qr-code';

interface QrGenProps {
  value: string;
  size?: number;
}

export default function QrGen({
  value,
  size = 180,
}: QrGenProps) {
  return (
    <div className='bg-white p-2 rounded-xl border-4 border-emerald-500/20 flex items-center justify-center shadow-sm'>
      <QRCode
        value={value}
        size={size}
        style={{
          height: 'auto',
          maxWidth: '100%',
          width: '100%',
        }}
        viewBox={`0 0 ${size} ${size}`}
        fgColor='#0f172a' // Slate 900 para garantir a leitura impecável
        bgColor='#ffffff' // Fundo branco obrigatório para contraste
      />
    </div>
  );
}

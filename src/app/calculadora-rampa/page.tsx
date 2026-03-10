import React from 'react';
import CalculadoraRampa from '@/components/CalculadoraRampa';

export const metadata = {
  title:
    'Calculadora de Rampa NBR 9050 | Riegos.dev',
  description:
    'Ferramenta gratuita para arquitetos e engenheiros calcularem inclinação, desnível e comprimento.',
};

export default function CalculadoraRampaPage() {
  return <CalculadoraRampa />;
}

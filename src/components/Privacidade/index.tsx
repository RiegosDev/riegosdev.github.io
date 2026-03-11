import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

export default function Privacidade() {
  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-extrabold tracking-tight text-foreground'>
            Política de Privacidade
          </h1>
          <p className='text-muted-foreground'>
            Em conformidade com a LGPD
          </p>
        </div>

        <div className='glass-card p-8 md:p-12 rounded-3xl bg-card border-border space-y-8 text-muted-foreground leading-relaxed'>
          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              1. Coleta de Dados
            </h2>
            <p>
              A sua privacidade é
              importante para nós.
              Solicitamos informações
              pessoais (como nome,
              e-mail e WhatsApp) apenas
              quando realmente
              precisamos delas para lhe
              fornecer um serviço, como
              no agendamento de uma
              consultoria técnica de
              arquitetura de software ou
              automação.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              2. Uso e Retenção
            </h2>
            <p>
              Retemos as informações
              coletadas pelo tempo
              necessário para fornecer o
              serviço solicitado. Os
              dados que armazenamos são
              protegidos dentro de meios
              comercialmente aceitáveis
              ​​para evitar perdas e
              roubos, bem como acesso,
              divulgação, cópia, uso ou
              modificação não
              autorizados.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              3. Compartilhamento de
              Informações
            </h2>
            <p>
              Não compartilhamos
              informações de
              identificação pessoal
              publicamente ou com
              terceiros, exceto quando
              exigido por lei. Somos
              engenheiros e prezamos
              pela segurança da
              informação (Clean
              Architecture e Data
              Security).
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              4. Cookies e Armazenamento
              Local
            </h2>
            <p>
              Utilizamos armazenamento
              local (`localStorage`) de
              forma mínima, estritamente
              para salvar suas
              preferências de interface
              (como a escolha entre o
              Light Mode e Dark Mode).
              Não utilizamos cookies de
              rastreamento agressivo.
            </p>
          </section>
        </div>
      </div>

      <div className='relative z-10'>
        <Footer />
      </div>
    </main>
  );
}

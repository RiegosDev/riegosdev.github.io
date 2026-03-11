import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

export default function Termos() {
  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-extrabold tracking-tight text-foreground'>
            Termos de Uso
          </h1>
          <p className='text-muted-foreground'>
            Última atualização: Março de
            2026
          </p>
        </div>

        <div className='glass-card p-8 md:p-12 rounded-3xl bg-card border-border space-y-8 text-muted-foreground leading-relaxed'>
          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar o site
              Riegos.dev, você concorda
              em cumprir estes termos de
              serviço, todas as leis e
              regulamentos aplicáveis.
              Se você não concordar com
              algum desses termos, está
              proibido de usar ou
              acessar este site.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              2. Nossos Serviços
            </h2>
            <p>
              A Riegos.dev atua no
              desenvolvimento de
              software Full Stack e
              engenharia de automação
              (via n8n e outras
              plataformas). Todo o
              escopo de desenvolvimento,
              prazos e arquitetura será
              definido em contrato
              específico com o cliente,
              não sendo este site um
              instrumento de promessa de
              entrega sem validação
              prévia.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              3. Propriedade Intelectual
            </h2>
            <p>
              Os materiais contidos
              neste site (textos,
              diagramas, códigos
              visíveis, logos) são
              protegidos pelas leis de
              direitos autorais e marcas
              comerciais aplicáveis. O
              uso de nossas ferramentas
              gratuitas (como
              calculadoras e templates)
              é permitido para fins
              pessoais e profissionais,
              desde que não
              comercializados como
              propriedade sua.
            </p>
          </section>

          <section>
            <h2 className='text-xl font-bold text-foreground mb-4'>
              4. Limitações de
              Responsabilidade
            </h2>
            <p>
              Em nenhum caso a
              Riegos.dev será
              responsável por quaisquer
              danos (incluindo, sem
              limitação, danos por perda
              de dados ou lucro ou
              devido a interrupção dos
              negócios) decorrentes do
              uso ou da incapacidade de
              usar as ferramentas deste
              site.
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

import Header from '../Header';
import Footer from '../Footer';
import {
  MessageCircle,
  Mail,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function FaleConosco() {
  return (
    <main className='relative min-h-screen text-foreground overflow-hidden font-sans antialiased bg-background'>
      <div className='aurora-bg'></div>
      <div className='aurora-line'></div>
      <Header />

      <div className='relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20'>
        <section className='text-center space-y-6 max-w-3xl mx-auto mt-10'>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-foreground'>
            Vamos construir o futuro da{' '}
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400'>
              sua operação.
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Escolha o melhor canal para
            conversarmos. Fale
            diretamente com o Daniel ou
            o Tiago.
          </p>
        </section>

        <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16'>
          {/* Card WhatsApp */}
          <Link
            href='https://wa.me/+5531988969661'
            target='_blank'
            rel='noopener noreferrer'
            className='glass-card p-8 rounded-2xl bg-card border-border hover:border-emerald-500/50 transition-all duration-300 group flex items-start gap-6'>
            <div className='w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shrink-0'>
              <MessageCircle className='text-emerald-500 w-7 h-7' />
            </div>
            <div>
              <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-emerald-500 transition-colors'>
                WhatsApp Direto - Tiago
                Riêgo
              </h3>
              <p className='text-muted-foreground text-sm mb-4'>
                Agende uma call de
                alinhamento técnico sem
                compromisso. Soluções
                Automação / Legado n8n.
              </p>
              <span className='text-emerald-500 text-sm font-semibold flex items-center gap-2'>
                Iniciar conversa{' '}
                <ArrowRight className='w-4 h-4' />
              </span>
            </div>
          </Link>

          {/* Card WhatsApp */}
          <Link
            href='https://wa.me/+5531993789275'
            target='_blank'
            rel='noopener noreferrer'
            className='glass-card p-8 rounded-2xl bg-card border-border hover:border-emerald-500/50 transition-all duration-300 group flex items-start gap-6'>
            <div className='w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shrink-0'>
              <MessageCircle className='text-emerald-500 w-7 h-7' />
            </div>
            <div>
              <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-emerald-500 transition-colors'>
                WhatsApp Direto - Daniel
                Riêgo
              </h3>
              <p className='text-muted-foreground text-sm mb-4'>
                Agende uma call de
                alinhamento técnico sem
                compromisso. Soluções
                FullStack / Legado Dev.
              </p>
              <span className='text-emerald-500 text-sm font-semibold flex items-center gap-2'>
                Iniciar conversa{' '}
                <ArrowRight className='w-4 h-4' />
              </span>
            </div>
          </Link>

          {/* Card Email */}
          <Link
            href='mailto:riegosdev@gmail.com'
            className='glass-card p-8 rounded-2xl bg-card border-border hover:border-teal-500/50 transition-all duration-300 group flex items-start gap-6'>
            <div className='w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/20 shrink-0'>
              <Mail className='text-teal-500 w-7 h-7' />
            </div>
            <div>
              <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-teal-500 transition-colors'>
                E-mail Comercial
              </h3>
              <p className='text-muted-foreground text-sm mb-4'>
                Prefere formalizar?
                Mande os detalhes do seu
                projeto.
              </p>
              <span className='text-teal-500 text-sm font-semibold flex items-center gap-2'>
                riegosdev@gmail.com{' '}
                <ArrowRight className='w-4 h-4' />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className='relative z-10'>
        <Footer />
      </div>
    </main>
  );
}

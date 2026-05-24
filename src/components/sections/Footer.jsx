import { Github, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contato" className="border-t-4 border-[#0a0a0a] bg-[#fcfcfc] pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h2 className="font-display mb-2 text-5xl font-bold uppercase">taura bots</h2>
            <p className="font-tech uppercase tracking-widest text-[#888888]">
              Centro de Tecnologia | UFSM
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/taurabots/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-[#fcfcfc] transition-transform hover:-translate-y-2"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/TauraBots"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-[#fcfcfc] transition-transform hover:-translate-y-2"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:taurabots@ufsm.br"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-[#fcfcfc] transition-transform hover:-translate-y-2"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-[#e5e5e5] pt-8 text-center font-mono text-xs uppercase text-[#888888] md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} Taura Bots. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Santa Maria, RS - Brasil</p>
        </div>
      </div>
    </footer>
  );
}

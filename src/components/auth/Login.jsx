import { useState } from 'react';
import { ArrowLeft, ChevronRight, Loader2, Lock } from 'lucide-react';

export default function Login({ onLogin, onBack }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] p-6 text-[#fcfcfc]">
      <div className="bg-pattern pointer-events-none absolute inset-0 animate-spin-slow opacity-10" />

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 font-tech font-bold uppercase tracking-widest text-[#888888] transition-colors hover:text-[#fcfcfc]"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-2" />
          Voltar ao Site Externo
        </button>

        <div className="border-4 border-[#888888] bg-[#1a1a1a] p-8 shadow-[16px_16px_0px_0px_rgba(255,255,255,0.1)] lg:p-12">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fcfcfc] text-[#0a0a0a]">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <h2 className="font-display mb-8 text-center text-5xl font-bold uppercase">
            Acesso
            <br />
            Restrito
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-tech text-sm uppercase tracking-widest text-[#888888]">
                E-mail Institucional
              </label>
              <input
                type="email"
                required
                disabled={isLoading}
                className="w-full border-2 border-[#888888] bg-transparent p-4 text-[#fcfcfc] transition-colors focus:border-[#fcfcfc] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="membro@taurabots.cloud"
              />
            </div>
            <div>
              <label className="mb-2 block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Senha
              </label>
              <input
                type="password"
                required
                disabled={isLoading}
                className="w-full border-2 border-[#888888] bg-transparent p-4 text-[#fcfcfc] transition-colors focus:border-[#fcfcfc] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group mt-4 flex w-full items-center justify-center gap-2 bg-[#fcfcfc] p-4 font-tech font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-[#888888] hover:text-[#fcfcfc] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  Autenticando <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Entrar
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t-2 border-dashed border-[#e5e5e5] pt-4 font-tech text-sm font-bold uppercase tracking-widest text-[#888888] sm:flex-row">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="border-2 border-[#0a0a0a] px-4 py-2 text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#fcfcfc] disabled:cursor-not-allowed disabled:border-[#cfcfcf] disabled:text-[#b0b0b0] disabled:hover:bg-transparent disabled:hover:text-[#b0b0b0]"
      >
        Pagina anterior
      </button>
      <span>
        Pagina {currentPage} de {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="border-2 border-[#0a0a0a] px-4 py-2 text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#fcfcfc] disabled:cursor-not-allowed disabled:border-[#cfcfcf] disabled:text-[#b0b0b0] disabled:hover:bg-transparent disabled:hover:text-[#b0b0b0]"
      >
        Proxima pagina
      </button>
    </div>
  );
}

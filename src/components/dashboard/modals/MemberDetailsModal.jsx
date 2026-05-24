import { Mail, X } from 'lucide-react';

export default function MemberDetailsModal({
  selectedMemberDetails,
  onClose,
  getProjectNameById,
  formatDate,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl border-4 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[16px_16px_0px_0px_#0a0a0a] md:p-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#888888] transition-colors hover:text-[#0a0a0a]"
        >
          <X className="h-8 w-8" />
        </button>

        <div className="mb-6 border-b-4 border-[#0a0a0a] pb-4 pr-8">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="bg-[#0a0a0a] px-2 py-1 font-tech text-xs font-bold uppercase tracking-widest text-[#fcfcfc]">
              {getProjectNameById(selectedMemberDetails.projectId)}
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-[#0a0a0a] md:text-5xl">
            {selectedMemberDetails.name}
          </h2>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <img
              src={selectedMemberDetails.photo}
              alt={selectedMemberDetails.name}
              className="h-24 w-24 border-2 border-[#0a0a0a] bg-[#e5e5e5] object-cover"
            />
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border-2 border-[#e5e5e5] p-4">
                <h4 className="mb-2 font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                  Curso
                </h4>
                <p className="font-tech text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                  {selectedMemberDetails.course}
                </p>
              </div>
              <div className="border-2 border-[#e5e5e5] p-4">
                <h4 className="mb-2 font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                  Nascimento
                </h4>
                <p className="font-tech text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                  {formatDate(selectedMemberDetails.birthDate)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-2 font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
              <Mail className="h-4 w-4" /> E-mail Institucional
            </h4>
            <a
              href={`mailto:${selectedMemberDetails.email}`}
              className="block border-l-4 border-[#0a0a0a] bg-[#e5e5e5] p-4 text-lg leading-relaxed text-[#0a0a0a] hover:underline"
            >
              {selectedMemberDetails.email}
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t-2 border-dashed border-[#e5e5e5] pt-6">
          <button
            onClick={onClose}
            className="bg-[#0a0a0a] px-8 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

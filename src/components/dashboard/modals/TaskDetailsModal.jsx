import { Activity, AlignLeft, X } from 'lucide-react';

export default function TaskDetailsModal({
  selectedTaskDetails,
  onClose,
  onDelete,
  getProjectNameById,
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
              {selectedTaskDetails.project.name}
            </span>
            <span className="border-2 border-[#0a0a0a] bg-[#e5e5e5] px-2 py-0.5 font-tech text-xs font-bold uppercase tracking-widest text-[#0a0a0a]">
              {selectedTaskDetails.kanban.title}
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-[#0a0a0a] md:text-5xl">
            {selectedTaskDetails.task.title}
          </h2>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="mb-2 flex items-center gap-2 font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
              <AlignLeft className="h-4 w-4" /> Descrição Completa
            </h4>
            <p className="whitespace-pre-wrap border-l-4 border-[#0a0a0a] bg-[#e5e5e5] p-4 text-lg leading-relaxed text-[#0a0a0a]">
              {selectedTaskDetails.task.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-2 border-[#e5e5e5] p-4">
              <h4 className="mb-3 font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                Status Atual
              </h4>
              <span className="font-display flex items-center gap-2 text-2xl font-bold uppercase text-[#0a0a0a]">
                <Activity className="h-6 w-6" />
                {selectedTaskDetails.statusTitle}
              </span>
            </div>

            <div className="border-2 border-[#e5e5e5] p-4">
              <h4 className="mb-3 font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                Responsável
              </h4>
              {selectedTaskDetails.assignee ? (
                <div className="flex items-center gap-3">
                  <img
                    src={selectedTaskDetails.assignee.photo}
                    alt={selectedTaskDetails.assignee.name}
                    className="h-10 w-10 border-2 border-[#0a0a0a] bg-[#e5e5e5] object-cover"
                  />
                  <div>
                    <p className="font-tech font-bold uppercase leading-none text-[#0a0a0a]">
                      {selectedTaskDetails.assignee.name}
                    </p>
                    <p className="text-xs text-[#888888]">
                      {getProjectNameById(selectedTaskDetails.assignee.projectId)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="font-tech font-bold uppercase text-[#888888]">
                  Não atribuído
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t-2 border-dashed border-[#e5e5e5] pt-6 sm:flex-row sm:justify-between">
          <button
            onClick={onDelete}
            disabled={selectedTaskDetails.kanban.isClosed}
            className="border-2 border-red-500 px-8 py-3 font-tech font-bold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500 hover:text-[#fcfcfc] disabled:cursor-not-allowed disabled:border-[#888888] disabled:text-[#888888] disabled:hover:bg-transparent"
          >
            Excluir Tarefa
          </button>
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

import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Plus,
  Trash2,
  Trophy,
  X,
} from 'lucide-react';

export default function EventsTab({
  nextUpcomingEvent,
  nextEventIndicatorLabel,
  showAddEvent,
  setShowAddEvent,
  newEvent,
  setNewEvent,
  handleAddEvent,
  sortedEvents,
  calculateDaysUntil,
  formatDate,
  handleDeleteEvent,
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 border-b-4 border-[#0a0a0a] pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-4xl font-bold uppercase">
            Agenda de Eventos
          </h3>
          <p className="mt-2 font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
            {nextUpcomingEvent
              ? `Esses registros alimentam o indicador ${nextEventIndicatorLabel}.`
              : 'Cadastre um evento futuro para alimentar o indicador da visão geral.'}
          </p>
        </div>
        <button
          onClick={() => setShowAddEvent((value) => !value)}
          className="group flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
        >
          {showAddEvent ? (
            <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
          ) : (
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          )}
          {showAddEvent ? 'Cancelar Cadastro' : 'Novo Evento'}
        </button>
      </div>

      {showAddEvent && (
        <div className="border-4 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] transition-all md:p-8">
          <h4 className="font-display mb-6 text-3xl font-bold uppercase">
            Cadastrar Evento
          </h4>
          <form
            onSubmit={handleAddEvent}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <div className="space-y-2 md:col-span-3">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Competição / Evento
              </label>
              <input
                type="text"
                required
                value={newEvent.name}
                onChange={(event) =>
                  setNewEvent({
                    ...newEvent,
                    name: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: LARC 2026"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Data
              </label>
              <input
                type="date"
                required
                value={newEvent.date}
                onChange={(event) =>
                  setNewEvent({
                    ...newEvent,
                    date: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Local
              </label>
              <input
                type="text"
                required
                value={newEvent.location}
                onChange={(event) =>
                  setNewEvent({
                    ...newEvent,
                    location: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: Curitiba, PR"
              />
            </div>

            <div className="pt-4 md:col-span-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-[#0a0a0a] px-8 py-4 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888] md:w-auto"
              >
                Salvar Evento <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sortedEvents.map((event) => {
          const isNextUpcomingEvent = nextUpcomingEvent?.id === event.id;
          const daysUntilEvent = calculateDaysUntil(event.date);
          const isPastEvent = daysUntilEvent !== null && daysUntilEvent < 0;

          return (
            <div
              key={event.id}
              className="group flex flex-col justify-between border-2 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[4px_4px_0px_0px_#888888] transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="border-2 border-[#0a0a0a] bg-[#0a0a0a] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#fcfcfc]">
                        Evento
                      </span>
                      {event.name.toLowerCase().includes('larc') && (
                        <span className="border-2 border-[#0a0a0a] bg-[#e5e5e5] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                          LARC
                        </span>
                      )}
                      {isNextUpcomingEvent && (
                        <span className="border-2 border-green-600 bg-green-600 px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#fcfcfc]">
                          Próximo Evento
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-4xl font-bold uppercase leading-none">
                      {event.name}
                    </h4>
                  </div>
                  <Trophy className="h-8 w-8 shrink-0 text-[#0a0a0a]" />
                </div>

                <div className="space-y-4 border-t-2 border-dashed border-[#e5e5e5] pt-4 text-sm text-[#0a0a0a]">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#888888]" />
                    <div className="flex flex-col">
                      <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                        Data
                      </strong>
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#888888]" />
                    <div className="flex flex-col">
                      <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                        Local
                      </strong>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="border-l-4 border-[#0a0a0a] bg-[#e5e5e5] p-3">
                    <strong className="mb-1 block font-tech text-xs uppercase tracking-widest text-[#888888]">
                      Contagem Regressiva
                    </strong>
                    <p className="font-tech text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                      {daysUntilEvent === null
                        ? 'Data inválida'
                        : isPastEvent
                          ? 'Evento encerrado'
                          : daysUntilEvent === 0
                            ? 'Acontece hoje'
                            : `Faltam ${daysUntilEvent} dias`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end border-t-2 border-dashed border-[#e5e5e5] pt-4">
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="rounded-sm border-2 border-transparent p-2 text-[#888888] transition-colors hover:border-red-500 hover:text-red-500"
                  title="Remover Evento"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {sortedEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center border-4 border-dashed border-[#888888] p-12 text-center text-[#888888]">
          <Trophy className="mb-4 h-16 w-16" />
          <h4 className="font-display mb-2 text-3xl font-bold uppercase">
            Nenhum evento cadastrado
          </h4>
          <p className="font-tech text-sm uppercase tracking-widest">
            Cadastre uma competição para alimentar a agenda e o card do próximo
            evento.
          </p>
        </div>
      )}
    </div>
  );
}

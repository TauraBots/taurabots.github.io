import { Activity, Box, Package } from 'lucide-react';

export default function OverviewTab({
  totalInventoryItems,
  totalRegisteredTasks,
  nextEventIndicatorLabel,
  daysToNextEvent,
  nextUpcomingEvent,
  formatDate,
  recentCompletedTasks,
  members,
  formatDateTime,
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="border-2 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] transition-transform hover:-translate-y-1">
          <div className="mb-4 flex items-start justify-between">
            <p className="font-tech font-bold uppercase tracking-widest text-[#888888]">
              Peças em Estoque
            </p>
            <Package className="h-6 w-6 text-[#0a0a0a]" />
          </div>
          <h3 className="font-display text-5xl font-bold">
            {totalInventoryItems}
          </h3>
        </div>

        <div className="border-2 border-[#0a0a0a] bg-[#0a0a0a] p-6 text-[#fcfcfc] shadow-[8px_8px_0px_0px_#888888] transition-transform hover:-translate-y-1">
          <div className="mb-4 flex items-start justify-between">
            <p className="font-tech font-bold uppercase tracking-widest text-[#888888]">
              Tarefas Ativas
            </p>
            <Activity className="h-6 w-6 text-[#fcfcfc]" />
          </div>
          <h3 className="font-display text-5xl font-bold">
            {totalRegisteredTasks}
          </h3>
          <p className="mt-3 font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
            Soma de todas as tarefas dos kanbans
          </p>
        </div>

        <div className="border-2 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] transition-transform hover:-translate-y-1">
          <div className="mb-4 flex items-start justify-between">
            <p className="font-tech font-bold uppercase tracking-widest text-[#888888]">
              {nextEventIndicatorLabel}
            </p>
            <Box className="h-6 w-6 text-[#0a0a0a]" />
          </div>
          <h3 className="font-display text-5xl font-bold">
            {daysToNextEvent ?? '--'}
          </h3>
          <p className="mt-3 font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
            {nextUpcomingEvent
              ? `${formatDate(nextUpcomingEvent.date)} • ${nextUpcomingEvent.location}`
              : 'Nenhum evento futuro cadastrado'}
          </p>
        </div>
      </div>

      <div className="border-2 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] md:p-8">
        <h3 className="font-display mb-6 text-3xl font-bold uppercase">
          Atividade Recente
        </h3>
        {recentCompletedTasks.length > 0 ? (
          <div className="space-y-4">
            {recentCompletedTasks.map((task) => {
              const assignee = members.find(
                (member) => member.id === task.assigneeId,
              );

              return (
                <div
                  key={task.id}
                  className="flex flex-col justify-between gap-2 border-b-2 border-[#e5e5e5] pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 rounded-full bg-[#0a0a0a]" />
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="font-tech text-sm uppercase tracking-widest text-[#888888]">
                        {task.projectName} • {task.kanbanTitle}
                        {assignee ? ` • ${assignee.name}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap font-tech text-sm font-bold text-[#888888]">
                    {formatDateTime(task.completedAt)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#888888] p-8 text-center text-[#888888]">
            <Activity className="mb-3 h-10 w-10" />
            <p className="font-tech text-sm font-bold uppercase tracking-widest">
              Nenhuma tarefa concluída ainda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { ChevronRight, ExternalLink, Plus, Trash2, X } from 'lucide-react';

export default function MembersTab({
  showAddMember,
  setShowAddMember,
  newMember,
  setNewMember,
  handleAddMember,
  handleMemberPhotoUpload,
  projectsData,
  sortedProjects,
  sortedMembers,
  getProjectNameById,
  formatDate,
  setSelectedMemberDetails,
  handleDeleteMember,
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 border-b-4 border-[#0a0a0a] pb-4 sm:flex-row sm:items-center">
        <h3 className="font-display text-4xl font-bold uppercase">
          Gestão de Equipe
        </h3>
        <button
          onClick={() => setShowAddMember((value) => !value)}
          className="group flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
        >
          {showAddMember ? (
            <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
          ) : (
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          )}
          {showAddMember ? 'Cancelar Cadastro' : 'Novo Membro'}
        </button>
      </div>

      {showAddMember && (
        <div className="border-4 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] transition-all md:p-8">
          <h4 className="font-display mb-6 text-3xl font-bold uppercase">
            Ficha de Cadastro
          </h4>
          <form
            onSubmit={handleAddMember}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={newMember.name}
                onChange={(event) =>
                  setNewMember({ ...newMember, name: event.target.value })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: Ada Lovelace"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                E-mail Institucional
              </label>
              <input
                type="email"
                required
                value={newMember.email}
                onChange={(event) =>
                  setNewMember({ ...newMember, email: event.target.value })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="ada@taurabots.cloud"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Foto do Membro (Opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMemberPhotoUpload}
                className="w-full border-2 border-[#888888] bg-transparent p-3 text-sm file:mr-4 file:border-0 file:bg-[#0a0a0a] file:px-4 file:py-2 file:font-tech file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-[#fcfcfc] focus:border-[#0a0a0a] focus:outline-none"
              />
              <p className="font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                Envie uma imagem local. Se nao enviar, o sistema gera um avatar
                automaticamente.
              </p>
              {newMember.photo && (
                <div className="flex items-center gap-3 border-2 border-dashed border-[#888888] p-3">
                  <img
                    src={newMember.photo}
                    alt="Preview da foto do membro"
                    className="h-14 w-14 border-2 border-[#0a0a0a] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setNewMember((current) => ({ ...current, photo: '' }))
                    }
                    className="font-tech text-xs font-bold uppercase tracking-widest text-[#888888] underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
                  >
                    Remover foto
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Projeto Alocado
              </label>
              <select
                required
                value={newMember.projectId}
                onChange={(event) =>
                  setNewMember({
                    ...newMember,
                    projectId: event.target.value,
                  })
                }
                className="w-full appearance-none border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                disabled={projectsData.length === 0}
              >
                <option value="" disabled>
                  {projectsData.length === 0
                    ? 'Nenhum projeto cadastrado'
                    : 'Selecione um projeto...'}
                </option>
                {sortedProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6 md:col-span-2">
              <div className="space-y-2">
                <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                  Curso
                </label>
                <input
                  type="text"
                  required
                  value={newMember.course}
                  onChange={(event) =>
                    setNewMember({ ...newMember, course: event.target.value })
                  }
                  className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                  placeholder="Ex: Eng. Elétrica"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                  Nascimento
                </label>
                <input
                  type="date"
                  required
                  value={newMember.birthDate}
                  onChange={(event) =>
                    setNewMember({
                      ...newMember,
                      birthDate: event.target.value,
                    })
                  }
                  className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 md:col-span-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-[#0a0a0a] px-8 py-4 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888] md:w-auto"
              >
                Salvar Membro <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMemberDetails(member)}
            className="group flex cursor-pointer flex-col justify-between border-2 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[4px_4px_0px_0px_#888888] transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="mb-6 flex items-start gap-4 border-b-2 border-dashed border-[#e5e5e5] pb-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-16 w-16 border-2 border-[#0a0a0a] bg-[#e5e5e5] object-cover"
                />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <h5
                    className="font-display truncate text-3xl font-bold uppercase"
                    title={member.name}
                  >
                    {member.name}
                  </h5>
                  <div className="mt-1">
                    <span className="inline-block whitespace-nowrap border-2 border-[#0a0a0a] bg-[#e5e5e5] px-2 py-0.5 font-tech text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                      {getProjectNameById(member.projectId)}
                    </span>
                  </div>
                </div>
                <div className="text-[#888888] opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-3 text-sm text-[#0a0a0a]">
                <p className="flex flex-col">
                  <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                    Curso
                  </strong>
                  {member.course}
                </p>
                <p className="flex flex-col">
                  <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                    E-mail
                  </strong>
                  <a
                    href={`mailto:${member.email}`}
                    className="truncate hover:underline"
                    title={member.email}
                  >
                    {member.email}
                  </a>
                </p>
                <p className="flex flex-col">
                  <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                    Nascimento
                  </strong>
                  {formatDate(member.birthDate)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteMember(member.id);
                }}
                className="rounded-sm border-2 border-transparent p-2 text-[#888888] transition-colors hover:border-red-500 hover:text-red-500"
                title="Remover Membro"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

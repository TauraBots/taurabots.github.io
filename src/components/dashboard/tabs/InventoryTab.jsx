import { ChevronRight, ExternalLink, Package, Plus, Trash2, X } from 'lucide-react';
import PaginationControls from '../components/PaginationControls';

export default function InventoryTab({
  showAddInventory,
  setShowAddInventory,
  newInventory,
  setNewInventory,
  handleAddInventory,
  handleInventoryPhotoUpload,
  sortedProjects,
  paginatedInventory,
  inventoryTotalPages,
  currentInventoryPage,
  setInventoryPage,
  formatCurrency,
  formatDate,
  setSelectedInventoryDetails,
  handleDeleteInventory,
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 border-b-4 border-[#0a0a0a] pb-4 sm:flex-row sm:items-center">
        <h3 className="font-display text-4xl font-bold uppercase">
          Controle de Estoque
        </h3>
        <button
          onClick={() => setShowAddInventory((value) => !value)}
          className="group flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
        >
          {showAddInventory ? (
            <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
          ) : (
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          )}
          {showAddInventory ? 'Cancelar Cadastro' : 'Novo Item'}
        </button>
      </div>

      {showAddInventory && (
        <div className="border-4 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] transition-all md:p-8">
          <h4 className="font-display mb-6 text-3xl font-bold uppercase">
            Cadastrar Material
          </h4>
          <form
            onSubmit={handleAddInventory}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Nome do Item
              </label>
              <input
                type="text"
                required
                value={newInventory.name}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    name: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: Placa Raspberry Pi 4"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Quantidade
              </label>
              <input
                type="number"
                min="1"
                required
                value={newInventory.quantity}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    quantity: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: 10"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Valor
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={newInventory.value}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    value: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: 149.90"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Tipo de Material
              </label>
              <select
                required
                value={newInventory.type}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    type: event.target.value,
                  })
                }
                className="w-full appearance-none border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
              >
                <option value="" disabled>
                  Selecione o tipo...
                </option>
                <option value="Consumível">
                  Consumível (ex: Estanho, Fios, Parafusos)
                </option>
                <option value="Permanente">
                  Permanente (ex: Motores, Placas, Ferramentas)
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Projeto Alocado
              </label>
              <select
                required
                value={newInventory.project}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    project: event.target.value,
                  })
                }
                className="w-full appearance-none border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
              >
                <option value="" disabled>
                  Selecione um projeto...
                </option>
                {sortedProjects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
                <option value="Uso Geral">Uso Geral / Compartilhado</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Data de Compra
              </label>
              <input
                type="date"
                required
                value={newInventory.purchaseDate}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    purchaseDate: event.target.value,
                  })
                }
                className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Fotografia do Material (Opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleInventoryPhotoUpload}
                className="w-full border-2 border-[#888888] bg-transparent p-3 text-sm file:mr-4 file:border-0 file:bg-[#0a0a0a] file:px-4 file:py-2 file:font-tech file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-[#fcfcfc] focus:border-[#0a0a0a] focus:outline-none"
              />
              <p className="font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                Envie uma imagem local para o material.
              </p>
              {newInventory.photo && (
                <div className="flex items-center gap-3 border-2 border-dashed border-[#888888] p-3">
                  <img
                    src={newInventory.photo}
                    alt="Preview da foto do material"
                    className="h-14 w-14 border-2 border-[#0a0a0a] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setNewInventory((current) => ({
                        ...current,
                        photo: '',
                      }))
                    }
                    className="font-tech text-xs font-bold uppercase tracking-widest text-[#888888] underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
                  >
                    Remover foto
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                Observação / Detalhes
              </label>
              <textarea
                rows="3"
                value={newInventory.notes}
                onChange={(event) =>
                  setNewInventory({
                    ...newInventory,
                    notes: event.target.value,
                  })
                }
                className="w-full resize-none border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                placeholder="Ex: Item guardado na gaveta 3. Cuidado ao manusear os pinos..."
              />
            </div>

            <div className="pt-4 md:col-span-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-[#0a0a0a] px-8 py-4 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888] md:w-auto"
              >
                Salvar Item <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedInventory.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedInventoryDetails(item)}
            className="group flex cursor-pointer flex-col justify-between border-2 border-[#0a0a0a] bg-[#fcfcfc] p-4 shadow-[4px_4px_0px_0px_#888888] transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="mb-3 flex items-start gap-3">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="h-12 w-12 shrink-0 border-2 border-[#0a0a0a] bg-[#e5e5e5] object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#0a0a0a] bg-[#e5e5e5] transition-colors group-hover:bg-[#0a0a0a] group-hover:text-[#fcfcfc]">
                    <Package className="h-6 w-6" />
                  </div>
                )}
                <h5 className="font-display mt-1 flex-1 break-words text-2xl font-bold uppercase leading-none">
                  {item.name}
                </h5>
                <div className="text-[#888888] opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className={`border-2 px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest ${
                    item.type === 'Consumível'
                      ? 'border-[#888888] text-[#888888]'
                      : 'border-[#0a0a0a] bg-[#0a0a0a] text-[#fcfcfc]'
                  }`}
                >
                  {item.type}
                </span>
                <span className="border-2 border-[#0a0a0a] bg-[#e5e5e5] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                  {item.project}
                </span>
                <span className="border-2 border-[#0a0a0a] bg-[#fcfcfc] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                  Qtd: {item.quantity}
                </span>
              </div>

              <div className="space-y-2 text-sm text-[#0a0a0a]">
                <p className="flex flex-col">
                  <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                    Valor
                  </strong>
                  {formatCurrency(item.value)}
                </p>
                <p className="flex flex-col">
                  <strong className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                    Data de Compra
                  </strong>
                  {formatDate(item.purchaseDate)}
                </p>
                {item.notes && (
                  <div className="mt-2 border-l-4 border-[#0a0a0a] bg-[#e5e5e5] p-3">
                    <strong className="mb-1 block font-tech text-xs uppercase tracking-widest text-[#888888]">
                      Observações
                    </strong>
                    <p className="italic text-[#0a0a0a]">{item.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-end border-t-2 border-dashed border-[#e5e5e5] pt-3">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteInventory(item.id);
                }}
                className="rounded-sm border-2 border-transparent p-2 text-[#888888] transition-colors hover:border-red-500 hover:text-red-500"
                title="Remover Item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <PaginationControls
        currentPage={currentInventoryPage}
        totalPages={inventoryTotalPages}
        onPrevious={() =>
          setInventoryPage((page) => Math.max(1, page - 1))
        }
        onNext={() =>
          setInventoryPage((page) => Math.min(inventoryTotalPages, page + 1))
        }
      />
    </div>
  );
}

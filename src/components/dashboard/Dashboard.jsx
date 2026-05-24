import { useState } from 'react';
import {
  AlignLeft,
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Cpu,
  ExternalLink,
  FolderKanban,
  KanbanSquare,
  LogOut,
  Package,
  Plus,
  Settings,
  Trash2,
  User,
  X,
} from 'lucide-react';
import PaginationControls from './components/PaginationControls';
import {
  initialEvents,
  initialInventory,
  initialMembers,
  initialProjectsData,
  INVENTORY_PAGE_SIZE,
  menuItems,
  RECENT_ACTIVITY_LIMIT,
  statusColors,
  statusTitles,
} from './config';
import InventoryDetailsModal from './modals/InventoryDetailsModal';
import MemberDetailsModal from './modals/MemberDetailsModal';
import TaskDetailsModal from './modals/TaskDetailsModal';
import EventsTab from './tabs/EventsTab';
import InventoryTab from './tabs/InventoryTab';
import MembersTab from './tabs/MembersTab';
import OverviewTab from './tabs/OverviewTab';
import {
  calculateDaysUntil,
  formatCurrency,
  formatDate,
  formatDateTime,
  parseDateValue,
  sortByName,
} from './utils';

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [members, setMembers] = useState(initialMembers);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    projectId: '',
    course: '',
    birthDate: '',
    email: '',
    photo: '',
  });

  const [inventory, setInventory] = useState(initialInventory);
  const [inventoryPage, setInventoryPage] = useState(1);
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [newInventory, setNewInventory] = useState({
    name: '',
    quantity: '',
    value: '',
    type: '',
    project: '',
    purchaseDate: '',
    notes: '',
    photo: '',
  });

  const [projectsData, setProjectsData] = useState(initialProjectsData);
  const [events, setEvents] = useState(initialEvents);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectInventoryPage, setProjectInventoryPage] = useState(1);
  const [activeKanbanId, setActiveKanbanId] = useState(null);
  const [projectTab, setProjectTab] = useState('kanban');

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    objective: '',
    event: '',
  });
  const [showAddKanban, setShowAddKanban] = useState(false);
  const [newKanbanTitle, setNewKanbanTitle] = useState('');
  const [showManageKanbans, setShowManageKanbans] = useState(false);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigneeId: '',
  });
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
  });

  const [selectedMemberDetails, setSelectedMemberDetails] = useState(null);
  const [selectedInventoryDetails, setSelectedInventoryDetails] = useState(null);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleAddMember = (event) => {
    event.preventDefault();
    const finalPhoto =
      newMember.photo ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        newMember.name,
      )}`;

    setMembers((current) => [
      {
        id: Date.now(),
        ...newMember,
        projectId: Number.parseInt(newMember.projectId, 10),
        photo: finalPhoto,
      },
      ...current,
    ]);
    setNewMember({
      name: '',
      projectId: '',
      course: '',
      birthDate: '',
      email: '',
      photo: '',
    });
    setShowAddMember(false);
  };

  const handleMemberPhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setNewMember((current) => ({ ...current, photo: '' }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setNewMember((current) => ({
        ...current,
        photo: typeof reader.result === 'string' ? reader.result : '',
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleInventoryPhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setNewInventory((current) => ({ ...current, photo: '' }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setNewInventory((current) => ({
        ...current,
        photo: typeof reader.result === 'string' ? reader.result : '',
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteMember = (id) => {
    setMembers((current) => current.filter((member) => member.id !== id));
  };

  const handleAddInventory = (event) => {
    event.preventDefault();
    setInventory((current) => [
      ...current,
      {
        id: Date.now(),
        ...newInventory,
        quantity: Number.parseInt(newInventory.quantity, 10),
        value: Number.parseFloat(newInventory.value),
      },
    ]);
    setNewInventory({
      name: '',
      quantity: '',
      value: '',
      type: '',
      project: '',
      purchaseDate: '',
      notes: '',
      photo: '',
    });
    setShowAddInventory(false);
  };

  const handleDeleteInventory = (id) => {
    setInventory((current) => current.filter((item) => item.id !== id));
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    const createdEvent = { id: Date.now(), ...newEvent };
    const isCreatingProject = showAddProject;

    setEvents((current) => [...current, createdEvent]);
    setNewEvent({
      name: '',
      date: '',
      location: '',
    });
    setShowAddEvent(false);

    if (isCreatingProject) {
      setNewProject((current) => ({
        ...current,
        event: createdEvent.name,
      }));
      setActiveTab('projects');
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents((current) => current.filter((item) => item.id !== id));
  };

  const handleOpenEventRegistration = () => {
    setActiveTab('events');
    setShowAddEvent(true);
  };

  const handleAddProject = (event) => {
    event.preventDefault();
    setProjectsData((current) => [
      ...current,
      { id: Date.now(), ...newProject, kanbans: [] },
    ]);
    setNewProject({ name: '', objective: '', event: '' });
    setShowAddProject(false);
  };

  const handleAddKanban = (event, projectId) => {
    event.preventDefault();
    const kanbanId = Date.now();

    setProjectsData((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              kanbans: [
              ...project.kanbans,
                {
                  id: kanbanId,
                  title: newKanbanTitle,
                  isClosed: false,
                  tasks: [],
                },
              ],
            }
          : project,
      ),
    );

    setActiveKanbanId(kanbanId);
    setNewKanbanTitle('');
    setShowAddKanban(false);
  };

  const handleAddTask = (event, projectId, kanbanId) => {
    event.preventDefault();

    setProjectsData((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              kanbans: project.kanbans.map((kanban) =>
                kanban.id === kanbanId
                  ? {
                      ...kanban,
                      tasks: [
                        ...kanban.tasks,
                        {
                          id: Date.now(),
                          ...newTask,
                          assigneeId: Number.parseInt(newTask.assigneeId, 10),
                          status: 'todo',
                          completedAt: null,
                        },
                      ],
                    }
                  : kanban,
              ),
            }
          : project,
      ),
    );

    setNewTask({ title: '', description: '', assigneeId: '' });
    setShowAddTask(false);
  };

  const handleDeleteTask = (projectId, kanbanId, taskId) => {
    setProjectsData((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              kanbans: project.kanbans.map((kanban) =>
                kanban.id === kanbanId
                  ? {
                      ...kanban,
                      tasks: kanban.tasks.filter((task) => task.id !== taskId),
                    }
                  : kanban,
              ),
            }
          : project,
      ),
    );

    setSelectedTaskDetails(null);
  };

  const handleDeleteKanban = (projectId, kanbanId) => {
    const updatedProjects = projectsData.map((project) =>
      project.id === projectId
        ? {
            ...project,
            kanbans: project.kanbans.filter((kanban) => kanban.id !== kanbanId),
          }
        : project,
    );

    setProjectsData(updatedProjects);

    if (activeKanbanId === kanbanId) {
      const project = updatedProjects.find((item) => item.id === projectId);
      setActiveKanbanId(
        project?.kanbans.find((kanban) => !kanban.isClosed)?.id ||
          project?.kanbans[0]?.id ||
          null,
      );
    }
  };

  const handleToggleKanbanClosed = (projectId, kanbanId) => {
    const updatedProjects = projectsData.map((project) =>
      project.id === projectId
        ? {
            ...project,
            kanbans: project.kanbans.map((kanban) =>
              kanban.id === kanbanId
                ? { ...kanban, isClosed: !kanban.isClosed }
                : kanban,
            ),
          }
        : project,
    );

    setProjectsData(updatedProjects);

    const updatedProject = updatedProjects.find((project) => project.id === projectId);
    const updatedKanban = updatedProject?.kanbans.find(
      (kanban) => kanban.id === kanbanId,
    );

    if (updatedKanban?.isClosed && activeKanbanId === kanbanId) {
      setShowAddTask(false);
    }
  };

  const handleDragStart = (taskId, kanbanId, projectId) => {
    setDraggedTask({ taskId, kanbanId, projectId });
  };

  const handleDrop = (event, newStatus, targetKanbanId, targetProjectId) => {
    event.preventDefault();

    if (!draggedTask) {
      return;
    }

    if (
      draggedTask.kanbanId !== targetKanbanId ||
      draggedTask.projectId !== targetProjectId
    ) {
      return;
    }

    setProjectsData((current) =>
      current.map((project) =>
        project.id === targetProjectId
          ? {
              ...project,
                    kanbans: project.kanbans.map((kanban) =>
                      kanban.id === targetKanbanId
                        ? {
                            ...kanban,
                            tasks: kanban.tasks.map((task) =>
                              task.id === draggedTask.taskId
                                ? {
                                    ...task,
                                    status: newStatus,
                                    completedAt:
                                      newStatus === 'done'
                                        ? task.status === 'done'
                                          ? task.completedAt
                                          : new Date().toISOString()
                                        : null,
                                  }
                                : task,
                            ),
                          }
                        : kanban,
              ),
            }
          : project,
      ),
    );

    setDraggedTask(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const sortedEvents = [...events].sort((firstEvent, secondEvent) => {
    const firstDate = parseDateValue(firstEvent.date);
    const secondDate = parseDateValue(secondEvent.date);

    if (!firstDate && !secondDate) {
      return 0;
    }

    if (!firstDate) {
      return 1;
    }

    if (!secondDate) {
      return -1;
    }

    return firstDate - secondDate;
  });

  const nextUpcomingEvent =
    sortedEvents.find((event) => {
      const daysUntil = calculateDaysUntil(event.date);
      return daysUntil !== null && daysUntil >= 0;
    }) || null;

  const daysToNextEvent =
    nextUpcomingEvent ? calculateDaysUntil(nextUpcomingEvent.date) : null;
  const nextEventIndicatorLabel = nextUpcomingEvent
    ? `Dias p/ ${nextUpcomingEvent.name}`
    : 'Dias p/ Evento';
  const sortedProjects = [...projectsData].sort(sortByName);
  const sortedMembers = [...members].sort(sortByName);
  const sortedInventory = [...inventory].sort(sortByName);
  const inventoryTotalPages = Math.max(
    1,
    Math.ceil(sortedInventory.length / INVENTORY_PAGE_SIZE),
  );
  const currentInventoryPage = Math.min(inventoryPage, inventoryTotalPages);
  const paginatedInventory = sortedInventory.slice(
    (currentInventoryPage - 1) * INVENTORY_PAGE_SIZE,
    currentInventoryPage * INVENTORY_PAGE_SIZE,
  );

  const allTasks = projectsData.flatMap((project) =>
    project.kanbans.flatMap((kanban) =>
      kanban.tasks.map((task) => ({
        ...task,
        projectId: project.id,
        projectName: project.name,
        kanbanId: kanban.id,
        kanbanTitle: kanban.title,
      })),
    ),
  );

  const totalInventoryItems = inventory.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );
  const totalRegisteredTasks = allTasks.length;

  const recentCompletedTasks = allTasks
    .filter((task) => task.status === 'done' && task.completedAt)
    .sort((firstTask, secondTask) => {
      const firstTime = new Date(firstTask.completedAt).getTime();
      const secondTime = new Date(secondTask.completedAt).getTime();

      return secondTime - firstTime;
    })
    .slice(0, RECENT_ACTIVITY_LIMIT);

  const getProjectNameById = (projectId) =>
    projectsData.find((project) => project.id === projectId)?.name ||
    'Projeto removido';

  return (
    <div className="flex min-h-screen w-full bg-[#e5e5e5] text-[#0a0a0a]">
      <aside className="hidden w-64 shrink-0 flex-col border-r-4 border-[#888888] bg-[#0a0a0a] text-[#fcfcfc] md:flex">
        <div className="flex h-20 shrink-0 items-center border-b-2 border-[#1a1a1a] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fcfcfc] text-[#0a0a0a]">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="font-display text-2xl font-bold uppercase tracking-wider">
              Portal Taura
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-4 p-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-3 font-tech font-bold uppercase tracking-wider transition-colors ${
                activeTab === item.id
                  ? 'bg-[#fcfcfc] text-[#0a0a0a]'
                  : 'text-[#888888] hover:bg-[#1a1a1a] hover:text-[#fcfcfc]'
              } flex items-center gap-3`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t-2 border-[#1a1a1a] p-6">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 p-3 font-tech font-bold uppercase tracking-wider text-[#888888] transition-colors hover:bg-[#1a1a1a] hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      <div className="fixed bottom-0 z-50 flex w-full justify-around border-t-4 border-[#888888] bg-[#0a0a0a] p-4 md:hidden">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`rounded-full p-2 ${
              activeTab === item.id
                ? 'bg-[#fcfcfc] text-[#0a0a0a]'
                : 'text-[#888888]'
            }`}
          >
            <item.icon className="h-6 w-6" />
          </button>
        ))}
      </div>

      <main className="flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex h-20 shrink-0 items-center justify-between border-b-4 border-[#0a0a0a] bg-[#fcfcfc] px-6 md:px-8">
          <h2 className="font-display text-3xl font-bold uppercase">
            {menuItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="hidden font-tech font-bold uppercase tracking-widest text-[#888888] sm:block">
              Olá, Membro Taura
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-[#e5e5e5]">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 pb-24 md:p-8 md:pb-8">
          {activeTab === 'overview' && (
            <OverviewTab
              totalInventoryItems={totalInventoryItems}
              totalRegisteredTasks={totalRegisteredTasks}
              nextEventIndicatorLabel={nextEventIndicatorLabel}
              daysToNextEvent={daysToNextEvent}
              nextUpcomingEvent={nextUpcomingEvent}
              formatDate={formatDate}
              recentCompletedTasks={recentCompletedTasks}
              members={members}
              formatDateTime={formatDateTime}
            />
          )}

          {activeTab === 'projects' && (
            <div className="mx-auto flex h-full max-w-7xl flex-col space-y-8">
              {!selectedProjectId ? (
                <>
                  <div className="flex shrink-0 flex-col items-start justify-between gap-4 border-b-4 border-[#0a0a0a] pb-4 sm:flex-row sm:items-center">
                    <h3 className="font-display text-4xl font-bold uppercase">
                      Projetos Ativos
                    </h3>
                    <button
                      onClick={() => setShowAddProject((value) => !value)}
                      className="group flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
                    >
                      {showAddProject ? (
                        <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
                      ) : (
                        <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                      )}
                      {showAddProject ? 'Cancelar' : 'Criar Projeto'}
                    </button>
                  </div>

                  {showAddProject && (
                    <div className="shrink-0 border-4 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a] transition-all md:p-8">
                      <h4 className="font-display mb-6 text-3xl font-bold uppercase">
                        Novo Projeto
                      </h4>
                      <form
                        onSubmit={handleAddProject}
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                      >
                        <div className="space-y-2">
                          <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                            Nome do Projeto
                          </label>
                          <input
                            type="text"
                            required
                            value={newProject.name}
                            onChange={(event) =>
                              setNewProject({
                                ...newProject,
                                name: event.target.value,
                              })
                            }
                            className="w-full border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                            placeholder="Ex: Robô Arqueiro"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                            Competição / Evento
                          </label>
                          <select
                            required
                            value={newProject.event}
                            onChange={(event) =>
                              setNewProject({
                                ...newProject,
                                event: event.target.value,
                              })
                            }
                            className="w-full appearance-none border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                          >
                            <option value="" disabled>
                              Selecione um evento...
                            </option>
                            {sortedEvents.map((registeredEvent) => (
                              <option
                                key={registeredEvent.id}
                                value={registeredEvent.name}
                              >
                                {registeredEvent.name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={handleOpenEventRegistration}
                            className="font-tech text-xs font-bold uppercase tracking-widest text-[#888888] underline underline-offset-4 transition-colors hover:text-[#0a0a0a]"
                          >
                            Evento nao esta na lista? Cadastrar em Eventos
                          </button>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="block font-tech text-sm uppercase tracking-widest text-[#888888]">
                            Objetivo Principal
                          </label>
                          <textarea
                            required
                            rows="2"
                            value={newProject.objective}
                            onChange={(event) =>
                              setNewProject({
                                ...newProject,
                                objective: event.target.value,
                              })
                            }
                            className="w-full resize-none border-2 border-[#888888] bg-transparent p-3 focus:border-[#0a0a0a] focus:outline-none"
                            placeholder="Descreva o foco deste projeto..."
                          />
                        </div>
                        <div className="pt-2 md:col-span-2">
                          <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-[#0a0a0a] px-8 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
                          >
                            Criar Projeto <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
                    {sortedProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setProjectInventoryPage(1);
                          setActiveKanbanId(
                            project.kanbans.find((kanban) => !kanban.isClosed)?.id ||
                              project.kanbans[0]?.id ||
                              null,
                          );
                        }}
                        className="group flex h-full cursor-pointer flex-col border-4 border-[#0a0a0a] bg-[#fcfcfc] p-8 transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#0a0a0a]"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <h4 className="font-display text-4xl font-bold uppercase leading-none transition-colors group-hover:text-[#888888]">
                            {project.name}
                          </h4>
                          <FolderKanban className="h-8 w-8 text-[#0a0a0a]" />
                        </div>
                        <span className="mb-6 inline-block self-start bg-[#0a0a0a] px-3 py-1 font-tech text-xs font-bold uppercase tracking-widest text-[#fcfcfc]">
                          {project.event}
                        </span>
                        <p className="flex-grow text-[#888888]">{project.objective}</p>
                        <div className="mt-8 flex items-center justify-between border-t-2 border-[#0a0a0a] pt-4 font-tech text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                          <span>{project.kanbans.length} Quadros Kanban</span>
                          <span className="flex items-center gap-1 transition-transform group-hover:translate-x-2">
                            Acessar <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                (() => {
                  const project = projectsData.find(
                    (item) => item.id === selectedProjectId,
                  );

                  if (!project) {
                    return null;
                  }

                  const activeKanban =
                    project.kanbans.find((item) => item.id === activeKanbanId) ||
                    project.kanbans[0];
                  const projectInventory = [...inventory]
                    .filter((item) => item.project === project.name)
                    .sort(sortByName);
                  const projectInventoryTotalPages = Math.max(
                    1,
                    Math.ceil(projectInventory.length / INVENTORY_PAGE_SIZE),
                  );
                  const currentProjectInventoryPage = Math.min(
                    projectInventoryPage,
                    projectInventoryTotalPages,
                  );
                  const paginatedProjectInventory = projectInventory.slice(
                    (currentProjectInventoryPage - 1) * INVENTORY_PAGE_SIZE,
                    currentProjectInventoryPage * INVENTORY_PAGE_SIZE,
                  );
                  const openKanbansCount = project.kanbans.filter(
                    (kanban) => !kanban.isClosed,
                  ).length;

                  return (
                    <div className="flex h-full flex-col space-y-6">
                      <div className="flex shrink-0 items-center gap-4 border-b-4 border-[#0a0a0a] pb-4">
                        <button
                          onClick={() => {
                            setSelectedProjectId(null);
                            setProjectTab('kanban');
                            setProjectInventoryPage(1);
                            setShowAddTask(false);
                            setShowAddKanban(false);
                            setShowManageKanbans(false);
                          }}
                          className="flex h-12 w-12 items-center justify-center bg-[#0a0a0a] text-[#fcfcfc] transition-colors hover:bg-[#888888]"
                        >
                          <ArrowLeft className="h-6 w-6" />
                        </button>
                        <div>
                          <p className="font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
                            Projeto / {project.event}
                          </p>
                          <h3 className="font-display text-4xl font-bold uppercase leading-none">
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-6 overflow-x-auto border-b-2 border-[#e5e5e5]">
                        <button
                          onClick={() => setProjectTab('kanban')}
                          className={`whitespace-nowrap border-b-4 pb-2 font-display text-2xl uppercase transition-colors ${
                            projectTab === 'kanban'
                              ? 'border-[#0a0a0a] text-[#0a0a0a]'
                              : 'border-transparent text-[#888888] hover:text-[#0a0a0a]'
                          }`}
                        >
                          Quadros Kanban
                        </button>
                        <button
                          onClick={() => setProjectTab('inventory')}
                          className={`whitespace-nowrap border-b-4 pb-2 font-display text-2xl uppercase transition-colors ${
                            projectTab === 'inventory'
                              ? 'border-[#0a0a0a] text-[#0a0a0a]'
                              : 'border-transparent text-[#888888] hover:text-[#0a0a0a]'
                          }`}
                        >
                          Inventário Alocado
                        </button>
                      </div>

                      {projectTab === 'kanban' ? (
                        <div className="flex h-full flex-col space-y-4">
                          <div className="flex shrink-0 flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                            <div className="flex flex-wrap gap-2">
                              {project.kanbans.map((kanban) => (
                                <button
                                  key={kanban.id}
                                  onClick={() => setActiveKanbanId(kanban.id)}
                                  className={`border-2 px-6 py-2 font-tech font-bold uppercase tracking-widest transition-colors ${
                                    activeKanban?.id === kanban.id
                                      ? kanban.isClosed
                                        ? 'border-[#888888] bg-[#888888] text-[#fcfcfc]'
                                        : 'border-[#0a0a0a] bg-[#0a0a0a] text-[#fcfcfc]'
                                      : kanban.isClosed
                                        ? 'border-[#888888] bg-[#f3f3f3] text-[#888888] hover:bg-[#e5e5e5]'
                                        : 'border-[#0a0a0a] bg-[#fcfcfc] text-[#0a0a0a] hover:bg-[#e5e5e5]'
                                  }`}
                                >
                                  {kanban.title}
                                  {kanban.isClosed ? ' • Encerrado' : ''}
                                </button>
                              ))}

                              {showAddKanban ? (
                                <form
                                  onSubmit={(event) => handleAddKanban(event, project.id)}
                                  className="flex gap-2"
                                >
                                  <input
                                    type="text"
                                    autoFocus
                                    required
                                    value={newKanbanTitle}
                                    onChange={(event) =>
                                      setNewKanbanTitle(event.target.value)
                                    }
                                    placeholder="Nome do Quadro..."
                                    className="border-2 border-[#0a0a0a] bg-transparent px-3 py-1 font-tech uppercase tracking-widest outline-none"
                                  />
                                  <button
                                    type="submit"
                                    className="bg-[#0a0a0a] px-3 py-1 text-[#fcfcfc] hover:bg-[#888888]"
                                  >
                                    <CheckCircle className="h-5 w-5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setShowAddKanban(false)}
                                    className="bg-[#e5e5e5] px-3 py-1 text-[#0a0a0a] hover:bg-[#888888]"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </form>
                              ) : (
                                <button
                                  onClick={() => setShowAddKanban(true)}
                                  className="flex items-center gap-2 border-2 border-dashed border-[#888888] px-4 py-2 font-tech font-bold uppercase tracking-widest text-[#888888] transition-colors hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
                                >
                                  <Plus className="h-4 w-4" /> Novo Quadro
                                </button>
                              )}
                            </div>

                            {activeKanban && (
                              <div className="flex shrink-0 gap-2">
                                <button
                                  onClick={() =>
                                    setShowManageKanbans((value) => !value)
                                  }
                                  className="flex shrink-0 items-center gap-2 border-2 border-[#0a0a0a] px-4 py-2 font-tech font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-[#e5e5e5]"
                                >
                                  <Settings className="h-5 w-5" /> Gerenciar Quadros
                                </button>
                                <button
                                  onClick={() => setShowAddTask(true)}
                                  disabled={activeKanban.isClosed}
                                  className="flex shrink-0 items-center gap-2 bg-[#0a0a0a] px-6 py-2 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Plus className="h-5 w-5" /> Adicionar Tarefa
                                </button>
                              </div>
                            )}
                          </div>

                          {showManageKanbans && (
                            <div className="border-4 border-[#0a0a0a] bg-[#fcfcfc] p-6 shadow-[8px_8px_0px_0px_#0a0a0a]">
                              <div className="mb-6 flex flex-col gap-2 border-b-2 border-[#e5e5e5] pb-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                  <h4 className="font-display text-3xl font-bold uppercase">
                                    Gestão dos Quadros
                                  </h4>
                                  <p className="mt-2 font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
                                    {openKanbansCount} quadros abertos •{' '}
                                    {project.kanbans.length - openKanbansCount} encerrados
                                  </p>
                                </div>
                                <p className="font-tech text-xs font-bold uppercase tracking-widest text-[#888888]">
                                  Encerrar mantém o histórico e reduz o risco de apagar o quadro errado.
                                </p>
                              </div>

                              <div className="space-y-4">
                                {project.kanbans.map((kanban) => (
                                  <div
                                    key={kanban.id}
                                    className="flex flex-col gap-4 border-2 border-[#0a0a0a] p-4 md:flex-row md:items-center md:justify-between"
                                  >
                                    <div>
                                      <div className="mb-2 flex flex-wrap gap-2">
                                        <span className="border-2 border-[#0a0a0a] bg-[#0a0a0a] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#fcfcfc]">
                                          {kanban.isClosed ? 'Encerrado' : 'Aberto'}
                                        </span>
                                        {activeKanban?.id === kanban.id && (
                                          <span className="border-2 border-[#0a0a0a] bg-[#e5e5e5] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]">
                                            Atual
                                          </span>
                                        )}
                                      </div>
                                      <h5 className="font-display text-2xl font-bold uppercase">
                                        {kanban.title}
                                      </h5>
                                      <p className="mt-1 font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
                                        {kanban.tasks.length} tarefas registradas
                                      </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                      <button
                                        onClick={() =>
                                          handleToggleKanbanClosed(project.id, kanban.id)
                                        }
                                        className={`px-4 py-2 font-tech text-sm font-bold uppercase tracking-widest transition-colors ${
                                          kanban.isClosed
                                            ? 'bg-[#0a0a0a] text-[#fcfcfc] hover:bg-[#888888]'
                                            : 'border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#e5e5e5]'
                                        }`}
                                      >
                                        {kanban.isClosed ? 'Reabrir Quadro' : 'Encerrar Quadro'}
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              `Excluir permanentemente o quadro "${kanban.title}"?`,
                                            )
                                          ) {
                                            handleDeleteKanban(project.id, kanban.id);
                                          }
                                        }}
                                        className="border-2 border-red-500 px-4 py-2 font-tech text-sm font-bold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500 hover:text-[#fcfcfc]"
                                      >
                                        Excluir Permanentemente
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeKanban?.isClosed && (
                            <div className="border-l-4 border-[#0a0a0a] bg-[#fcfcfc] p-4">
                              <p className="font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
                                Este quadro foi encerrado. Você ainda pode consultar o histórico, mas novas tarefas e alterações foram bloqueadas.
                              </p>
                            </div>
                          )}

                          {showAddTask && activeKanban && !activeKanban.isClosed && (
                            <div className="relative shrink-0 border-4 border-[#0a0a0a] bg-[#e5e5e5] p-6">
                              <button
                                onClick={() => setShowAddTask(false)}
                                className="absolute right-4 top-4 text-[#888888] hover:text-[#0a0a0a]"
                              >
                                <X className="h-6 w-6" />
                              </button>
                              <h4 className="font-display mb-4 text-2xl font-bold uppercase">
                                Nova Tarefa em: {activeKanban.title}
                              </h4>
                              <form
                                onSubmit={(event) =>
                                  handleAddTask(event, project.id, activeKanban.id)
                                }
                                className="grid grid-cols-1 gap-4 md:grid-cols-3"
                              >
                                <div className="space-y-1">
                                  <label className="block font-tech text-xs font-bold uppercase text-[#888888]">
                                    Título
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={newTask.title}
                                    onChange={(event) =>
                                      setNewTask({
                                        ...newTask,
                                        title: event.target.value,
                                      })
                                    }
                                    className="w-full border-2 border-[#888888] bg-[#fcfcfc] p-2 text-sm outline-none focus:border-[#0a0a0a]"
                                  />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className="block font-tech text-xs font-bold uppercase text-[#888888]">
                                    Descrição Curta
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={newTask.description}
                                    onChange={(event) =>
                                      setNewTask({
                                        ...newTask,
                                        description: event.target.value,
                                      })
                                    }
                                    className="w-full border-2 border-[#888888] bg-[#fcfcfc] p-2 text-sm outline-none focus:border-[#0a0a0a]"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block font-tech text-xs font-bold uppercase text-[#888888]">
                                    Responsável
                                  </label>
                                  <select
                                    required
                                    value={newTask.assigneeId}
                                    onChange={(event) =>
                                      setNewTask({
                                        ...newTask,
                                        assigneeId: event.target.value,
                                      })
                                    }
                                    className="w-full border-2 border-[#888888] bg-[#fcfcfc] p-2 text-sm outline-none focus:border-[#0a0a0a]"
                                  >
                                    <option value="" disabled>
                                      Selecionar...
                                    </option>
                                    {sortedMembers.map((member) => (
                                      <option key={member.id} value={member.id}>
                                        {member.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="flex items-end md:col-span-2">
                                  <button
                                    type="submit"
                                    className="h-[40px] bg-[#0a0a0a] px-6 py-2 font-tech text-sm font-bold uppercase text-[#fcfcfc] hover:bg-[#888888]"
                                  >
                                    Salvar Tarefa
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}

                          {activeKanban ? (
                            <div className="grid min-h-0 flex-grow grid-cols-1 gap-6 overflow-x-auto pb-4 lg:grid-cols-3">
                              {['todo', 'in-progress', 'done'].map((status) => {
                                const columnTasks = activeKanban.tasks.filter(
                                  (task) => task.status === status,
                                );

                                return (
                                  <div
                                    key={status}
                                    onDragOver={
                                      activeKanban.isClosed ? undefined : handleDragOver
                                    }
                                    onDrop={
                                      activeKanban.isClosed
                                        ? undefined
                                        : (event) =>
                                            handleDrop(
                                              event,
                                              status,
                                              activeKanban.id,
                                              project.id,
                                            )
                                    }
                                    className="flex min-w-[300px] flex-col border-4 border-[#0a0a0a] bg-[#e5e5e5]"
                                  >
                                    <div
                                      className={`flex items-center justify-between border-b-4 bg-[#0a0a0a] p-4 text-[#fcfcfc] ${statusColors[status]}`}
                                    >
                                      <h5 className="font-display text-2xl font-bold uppercase leading-none">
                                        {statusTitles[status]}
                                      </h5>
                                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fcfcfc] font-tech text-xs font-bold text-[#0a0a0a]">
                                        {columnTasks.length}
                                      </span>
                                    </div>

                                    <div className="min-h-[200px] flex-grow space-y-4 overflow-y-auto p-4">
                                      {columnTasks.map((task) => {
                                        const assignee = members.find(
                                          (member) => member.id === task.assigneeId,
                                        );

                                        return (
                                          <div
                                            key={task.id}
                                            draggable={!activeKanban.isClosed}
                                            onDragStart={() =>
                                              !activeKanban.isClosed &&
                                              handleDragStart(
                                                task.id,
                                                activeKanban.id,
                                                project.id,
                                              )
                                            }
                                            onClick={() =>
                                              setSelectedTaskDetails({
                                                task,
                                                assignee,
                                                statusTitle: statusTitles[status],
                                                project,
                                                kanban: activeKanban,
                                              })
                                            }
                                            className="group relative cursor-pointer border-2 border-[#0a0a0a] bg-[#fcfcfc] p-4 transition-shadow hover:shadow-[4px_4px_0px_0px_#0a0a0a] active:cursor-grabbing"
                                          >
                                            <div className="absolute right-2 top-2 text-[#888888] opacity-0 transition-opacity group-hover:opacity-100">
                                              <ExternalLink className="h-4 w-4" />
                                            </div>
                                            <h6 className="mb-1 pr-6 font-tech font-bold uppercase tracking-wider text-[#0a0a0a]">
                                              {task.title}
                                            </h6>
                                            <p className="line-clamp-2 mb-4 text-xs text-[#888888]">
                                              <AlignLeft className="mr-1 inline h-3 w-3" />
                                              {task.description}
                                            </p>

                                            {assignee && (
                                              <div className="flex items-center gap-2 border-t-2 border-dashed border-[#e5e5e5] pt-3">
                                                <img
                                                  src={assignee.photo}
                                                  alt={assignee.name}
                                                  className="h-6 w-6 rounded-full border border-[#0a0a0a] bg-[#e5e5e5]"
                                                />
                                                <span className="truncate font-tech text-xs font-bold uppercase text-[#888888]">
                                                  {assignee.name}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}

                                      {columnTasks.length === 0 && (
                                        <div className="flex h-full items-center justify-center border-2 border-dashed border-[#888888] p-4 font-tech text-sm uppercase tracking-widest text-[#888888]">
                                          Soltar Tarefas Aqui
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex flex-grow flex-col items-center justify-center border-4 border-dashed border-[#888888] p-12 text-center text-[#888888]">
                              <KanbanSquare className="mb-4 h-16 w-16" />
                              <h3 className="font-display mb-2 text-4xl font-bold uppercase">
                                Nenhum Quadro Criado
                              </h3>
                              <p className="mb-6 font-tech text-xl uppercase tracking-widest">
                                Crie um quadro Kanban para começar a organizar as
                                tarefas deste projeto.
                              </p>
                              <button
                                onClick={() => setShowAddKanban(true)}
                                className="bg-[#0a0a0a] px-8 py-3 font-tech font-bold uppercase tracking-widest text-[#fcfcfc] transition-colors hover:bg-[#888888]"
                              >
                                Criar Primeiro Quadro
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex-grow overflow-y-auto pb-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {paginatedProjectInventory.map((item) => (
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
                                        <p className="italic text-[#0a0a0a]">
                                          {item.notes}
                                        </p>
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

                            {projectInventory.length === 0 && (
                              <div className="col-span-full flex flex-col items-center justify-center border-4 border-dashed border-[#888888] p-12 text-[#888888]">
                                <Package className="mb-4 h-16 w-16" />
                                <h4 className="font-display mb-2 text-3xl font-bold uppercase">
                                  Nenhum item alocado
                                </h4>
                                <p className="text-center font-tech text-sm uppercase tracking-widest">
                                  Acesse a aba de Inventário do menu principal
                                  <br />
                                  para cadastrar materiais para este projeto.
                                </p>
                              </div>
                            )}
                          </div>
                          <PaginationControls
                            currentPage={currentProjectInventoryPage}
                            totalPages={projectInventoryTotalPages}
                            onPrevious={() =>
                              setProjectInventoryPage((page) =>
                                Math.max(1, page - 1),
                              )
                            }
                            onNext={() =>
                              setProjectInventoryPage((page) =>
                                Math.min(projectInventoryTotalPages, page + 1),
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {selectedTaskDetails && (
            <TaskDetailsModal
              selectedTaskDetails={selectedTaskDetails}
              onClose={() => setSelectedTaskDetails(null)}
              onDelete={() => {
                if (
                  window.confirm(
                    `Excluir a tarefa "${selectedTaskDetails.task.title}"?`,
                  )
                ) {
                  handleDeleteTask(
                    selectedTaskDetails.project.id,
                    selectedTaskDetails.kanban.id,
                    selectedTaskDetails.task.id,
                  );
                }
              }}
              getProjectNameById={getProjectNameById}
            />
          )}

          {selectedInventoryDetails && (
            <InventoryDetailsModal
              selectedInventoryDetails={selectedInventoryDetails}
              onClose={() => setSelectedInventoryDetails(null)}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          )}

          {selectedMemberDetails && (
            <MemberDetailsModal
              selectedMemberDetails={selectedMemberDetails}
              onClose={() => setSelectedMemberDetails(null)}
              getProjectNameById={getProjectNameById}
              formatDate={formatDate}
            />
          )}

          {activeTab === 'events' && (
            <EventsTab
              nextUpcomingEvent={nextUpcomingEvent}
              nextEventIndicatorLabel={nextEventIndicatorLabel}
              showAddEvent={showAddEvent}
              setShowAddEvent={setShowAddEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleAddEvent={handleAddEvent}
              sortedEvents={sortedEvents}
              calculateDaysUntil={calculateDaysUntil}
              formatDate={formatDate}
              handleDeleteEvent={handleDeleteEvent}
            />
          )}

          {activeTab === 'members' && (
            <MembersTab
              showAddMember={showAddMember}
              setShowAddMember={setShowAddMember}
              newMember={newMember}
              setNewMember={setNewMember}
              handleAddMember={handleAddMember}
              handleMemberPhotoUpload={handleMemberPhotoUpload}
              projectsData={projectsData}
              sortedProjects={sortedProjects}
              sortedMembers={sortedMembers}
              getProjectNameById={getProjectNameById}
              formatDate={formatDate}
              setSelectedMemberDetails={setSelectedMemberDetails}
              handleDeleteMember={handleDeleteMember}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryTab
              showAddInventory={showAddInventory}
              setShowAddInventory={setShowAddInventory}
              newInventory={newInventory}
              setNewInventory={setNewInventory}
              handleAddInventory={handleAddInventory}
              handleInventoryPhotoUpload={handleInventoryPhotoUpload}
              sortedProjects={sortedProjects}
              paginatedInventory={paginatedInventory}
              inventoryTotalPages={inventoryTotalPages}
              currentInventoryPage={currentInventoryPage}
              setInventoryPage={setInventoryPage}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              setSelectedInventoryDetails={setSelectedInventoryDetails}
              handleDeleteInventory={handleDeleteInventory}
            />
          )}

          {!['overview', 'projects', 'events', 'members', 'inventory'].includes(
            activeTab,
          ) && (
            <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center border-4 border-dashed border-[#888888] p-12 text-center opacity-50">
              <Settings className="mb-4 h-16 w-16 animate-spin-slow" />
              <h3 className="font-display mb-2 text-4xl font-bold uppercase">
                Módulo em Desenvolvimento
              </h3>
              <p className="font-tech text-xl uppercase tracking-widest text-[#888888]">
                A seção de {menuItems.find((item) => item.id === activeTab)?.label}
                estará disponível na próxima atualização do sistema.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

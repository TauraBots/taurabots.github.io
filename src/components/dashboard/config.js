import {
  Cpu,
  LayoutDashboard,
  Package,
  Trophy,
  Users,
} from 'lucide-react';

export const initialMembers = [
  {
    id: 1,
    name: 'Lucas Silva',
    projectId: 3,
    course: 'Eng. da Computação',
    birthDate: '2001-05-14',
    email: 'lucas@taurabots.cloud',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
  },
  {
    id: 2,
    name: 'Mariana Costa',
    projectId: 2,
    course: 'Eng. Aeroespacial',
    birthDate: '2002-11-23',
    email: 'mariana@taurabots.cloud',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
  },
  {
    id: 3,
    name: 'João Pedro',
    projectId: 1,
    course: 'Sistemas de Informação',
    birthDate: '2000-08-05',
    email: 'joao@taurabots.cloud',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
  },
];

export const initialInventory = [
  {
    id: 1,
    name: 'Motor Maxon EC 45',
    quantity: 6,
    value: 849.9,
    type: 'Permanente',
    project: 'Small Size League',
    purchaseDate: '2024-03-10',
    notes: 'Motor flat usado no sistema de drible dos robôs SSL.',
    photo:
      'https://images.unsplash.com/photo-1580983546533-31fcf3121516?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 2,
    name: 'Bateria LiPo 3S 1500mAh',
    quantity: 12,
    value: 129.5,
    type: 'Consumível',
    project: 'Drone Autônomo',
    purchaseDate: '2025-10-15',
    notes: 'Atenção aos ciclos de carga. Armazenar em local seguro.',
    photo: '',
  },
  {
    id: 3,
    name: 'Rolo de Estanho 0.8mm',
    quantity: 3,
    value: 42.0,
    type: 'Consumível',
    project: 'Uso Geral',
    purchaseDate: '2026-01-20',
    notes: 'Fica na gaveta 2 da bancada de eletrônica principal.',
    photo: '',
  },
];

export const initialProjectsData = [
  {
    id: 1,
    name: 'Small Size League',
    objective: 'Desenvolver 6 robôs autônomos para futebol em campo reduzido.',
    event: 'CBR 2026',
    kanbans: [
      {
        id: 11,
        title: 'Software',
        isClosed: false,
        tasks: [
          {
            id: 111,
            title: 'Calibração de Câmera',
            description: 'Ajustar filtros HSV para a cor da bola.',
            assigneeId: 1,
            status: 'in-progress',
            completedAt: null,
          },
          {
            id: 112,
            title: 'Pathfinding',
            description: 'Implementar algoritmo para desvio de obstáculos.',
            assigneeId: 3,
            status: 'todo',
            completedAt: null,
          },
        ],
      },
      {
        id: 12,
        title: 'Eletrônica',
        isClosed: false,
        tasks: [
          {
            id: 113,
            title: 'Placa de Chute',
            description:
              'Soldar capacitores de alta tensão (Atenção redobrada!).',
            assigneeId: 1,
            status: 'done',
            completedAt: '2026-05-22T19:30:00',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Drone Autônomo',
    objective:
      'Navegação autônoma e reconhecimento de imagens em ambiente indoor.',
    event: 'CBR 2026',
    kanbans: [],
  },
  {
    id: 3,
    name: 'VSSS',
    objective: 'Futebol 3v3 com robôs cubo de 7.5cm.',
    event: 'LARC 2026',
    kanbans: [],
  },
  {
    id: 4,
    name: 'Marketing/ADM',
    objective:
      'Gerir comunicação, organização interna, captação e apoio administrativo da equipe.',
    event: 'Institucional 2026',
    kanbans: [],
  },
];

export const initialEvents = [
  {
    id: 1,
    name: 'CBR 2026',
    date: '2026-07-25',
    location: 'São Paulo, SP',
  },
  {
    id: 2,
    name: 'LARC 2026',
    date: '2026-09-18',
    location: 'Curitiba, PR',
  },
  {
    id: 3,
    name: 'RoboCup 2026',
    date: '2026-11-02',
    location: 'Seul, Coreia do Sul',
  },
  {
    id: 4,
    name: 'Institucional 2026',
    date: '2026-12-01',
    location: 'Santa Maria, RS',
  },
];

export const menuItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Visão Geral' },
  { id: 'projects', icon: Cpu, label: 'Projetos' },
  { id: 'events', icon: Trophy, label: 'Eventos' },
  { id: 'inventory', icon: Package, label: 'Inventário' },
  { id: 'members', icon: Users, label: 'Membros' },
];

export const statusTitles = {
  todo: 'Por Fazer',
  'in-progress': 'Em Curso',
  done: 'Concluído',
};

export const statusColors = {
  todo: 'border-[#888888]',
  'in-progress': 'border-blue-500',
  done: 'border-green-500',
};

export const RECENT_ACTIVITY_LIMIT = 5;
export const INVENTORY_PAGE_SIZE = 16;

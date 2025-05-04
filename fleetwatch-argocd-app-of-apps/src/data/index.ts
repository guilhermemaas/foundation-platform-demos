import { User, Vehicle, Delivery, MenuItem } from '../types';
import { randomInt } from '../utils/helpers';

// Fake user data
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@fleetwatch.com',
    avatar: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    role: 'Administrator'
  }
];

// Default credentials
export const defaultCredentials = {
  email: 'admin@fleetwatch.com',
  password: 'admin123'
};

// Fake vehicle data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    plateNumber: 'XYZ-1234',
    type: 'truck',
    status: 'active',
    driver: 'João Silva',
    location: { lat: -23.550520, lng: -46.633308 },
    lastUpdate: new Date(Date.now() - randomInt(1, 30) * 60000).toISOString(),
    fuel: 75,
    temperature: 5
  },
  {
    id: '2',
    plateNumber: 'ABC-5678',
    type: 'van',
    status: 'active',
    driver: 'Maria Oliveira',
    location: { lat: -23.557256, lng: -46.640241 },
    lastUpdate: new Date(Date.now() - randomInt(1, 30) * 60000).toISOString(),
    fuel: 45,
  },
  {
    id: '3',
    plateNumber: 'DEF-9012',
    type: 'motorcycle',
    status: 'active',
    driver: 'Carlos Santos',
    location: { lat: -23.543488, lng: -46.642602 },
    lastUpdate: new Date(Date.now() - randomInt(1, 30) * 60000).toISOString(),
    fuel: 80,
  },
  {
    id: '4',
    plateNumber: 'GHI-3456',
    type: 'truck',
    status: 'maintenance',
    driver: 'Ana Pereira',
    location: { lat: -23.564915, lng: -46.651544 },
    lastUpdate: new Date(Date.now() - randomInt(1, 30) * 60000).toISOString(),
    fuel: 30,
    temperature: 2
  },
  {
    id: '5',
    plateNumber: 'JKL-7890',
    type: 'van',
    status: 'inactive',
    driver: 'Roberto Alves',
    location: { lat: -23.551262, lng: -46.623755 },
    lastUpdate: new Date(Date.now() - randomInt(40, 120) * 60000).toISOString(),
    fuel: 60,
  }
];

// Fake delivery data
export const deliveries: Delivery[] = [
  {
    id: '1',
    vehicleId: '1',
    status: 'in-progress',
    customer: 'Supermercado Central',
    address: 'Av. Paulista, 1000',
    estimatedDelivery: new Date(Date.now() + 60 * 60000).toISOString(),
    items: 24,
    priority: 'high'
  },
  {
    id: '2',
    vehicleId: '1',
    status: 'pending',
    customer: 'Farmácia Saúde',
    address: 'Rua Augusta, 1500',
    estimatedDelivery: new Date(Date.now() + 2 * 60 * 60000).toISOString(),
    items: 12,
    priority: 'medium'
  },
  {
    id: '3',
    vehicleId: '2',
    status: 'in-progress',
    customer: 'Loja de Eletrônicos Tech',
    address: 'Av. Faria Lima, 500',
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
    items: 8,
    priority: 'medium'
  },
  {
    id: '4',
    vehicleId: '3',
    status: 'in-progress',
    customer: 'Restaurante Sabor',
    address: 'Rua Oscar Freire, 300',
    estimatedDelivery: new Date(Date.now() + 15 * 60000).toISOString(),
    items: 3,
    priority: 'high'
  },
  {
    id: '5',
    vehicleId: '3',
    status: 'pending',
    customer: 'Café Expresso',
    address: 'Alameda Santos, 700',
    estimatedDelivery: new Date(Date.now() + 60 * 60000).toISOString(),
    items: 5,
    priority: 'low'
  },
  {
    id: '6',
    vehicleId: '5',
    status: 'cancelled',
    customer: 'Loja de Roupas Fashion',
    address: 'Rua 25 de Março, 200',
    estimatedDelivery: new Date(Date.now() - 30 * 60000).toISOString(),
    items: 15,
    priority: 'medium'
  },
  {
    id: '7',
    vehicleId: '2',
    status: 'completed',
    customer: 'Padaria Pão Quente',
    address: 'Av. Rebouças, 900',
    estimatedDelivery: new Date(Date.now() - 60 * 60000).toISOString(),
    items: 10,
    priority: 'medium'
  }
];

// Sidebar menu items
export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'layout-dashboard',
    path: '/dashboard'
  },
  {
    title: 'Veículos',
    icon: 'truck',
    path: '/vehicles',
    badge: {
      count: 5,
      variant: 'default'
    }
  },
  {
    title: 'Entregas',
    icon: 'package',
    path: '/deliveries',
    badge: {
      count: 7,
      variant: 'default'
    }
  },
  {
    title: 'Motoristas',
    icon: 'users',
    path: '/drivers'
  },
  {
    title: 'Manutenção',
    icon: 'wrench',
    path: '/maintenance',
    badge: {
      count: 1,
      variant: 'error'
    }
  },
  {
    title: 'Relatórios',
    icon: 'bar-chart',
    path: '/reports'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    path: '/settings'
  }
];
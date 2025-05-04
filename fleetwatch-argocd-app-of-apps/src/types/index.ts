export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: 'truck' | 'van' | 'motorcycle';
  status: 'active' | 'inactive' | 'maintenance';
  driver: string;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdate: string;
  fuel: number;
  temperature?: number;
}

export interface Delivery {
  id: string;
  vehicleId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  customer: string;
  address: string;
  estimatedDelivery: string;
  items: number;
  priority: 'low' | 'medium' | 'high';
}

export interface MenuItem {
  title: string;
  icon: string;
  path: string;
  badge?: {
    count: number;
    variant: 'default' | 'warning' | 'error' | 'success';
  };
}
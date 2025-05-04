// Generate a random integer between min and max (inclusive)
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format time elapsed since date
export function timeElapsed(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seg atrás`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min atrás`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
}

// Get status color
export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
    case 'completed':
    case 'success':
      return 'bg-green-500';
    case 'inactive':
    case 'pending':
      return 'bg-amber-500';
    case 'maintenance':
    case 'cancelled':
    case 'error':
      return 'bg-red-500';
    case 'in-progress':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
}

// Get priority label and color
export function getPriorityInfo(priority: string): { label: string; color: string } {
  switch (priority) {
    case 'high':
      return { label: 'Alta', color: 'bg-red-500' };
    case 'medium':
      return { label: 'Média', color: 'bg-amber-500' };
    case 'low':
      return { label: 'Baixa', color: 'bg-green-500' };
    default:
      return { label: 'Normal', color: 'bg-gray-500' };
  }
}

// Get status label
export function getStatusLabel(status: string): string {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'inactive':
      return 'Inativo';
    case 'maintenance':
      return 'Em Manutenção';
    case 'pending':
      return 'Pendente';
    case 'in-progress':
      return 'Em Progresso';
    case 'completed':
      return 'Concluído';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
}
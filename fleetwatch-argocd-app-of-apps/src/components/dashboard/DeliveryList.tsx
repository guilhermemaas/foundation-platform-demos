import React from 'react';
import { Clock, PackageCheck, PackageX, Truck, AlertTriangle } from 'lucide-react';
import { Delivery, Vehicle } from '../../types';
import { formatDate, getPriorityInfo, getStatusLabel, timeElapsed } from '../../utils/helpers';

interface DeliveryListProps {
  deliveries: Delivery[];
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
}

const DeliveryList: React.FC<DeliveryListProps> = ({ 
  deliveries, 
  vehicles, 
  selectedVehicleId 
}) => {
  // Filter deliveries by the selected vehicle, or show all if none selected
  const filteredDeliveries = selectedVehicleId 
    ? deliveries.filter(delivery => delivery.vehicleId === selectedVehicleId)
    : deliveries;

  const getVehiclePlate = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.plateNumber : 'N/A';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <PackageCheck className="h-5 w-5" />;
      case 'cancelled':
        return <PackageX className="h-5 w-5" />;
      case 'in-progress':
        return <Truck className="h-5 w-5" />;
      case 'pending':
        return <Clock className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
        <h2 className="font-bold text-white">
          {selectedVehicleId 
            ? `Entregas do Veículo ${getVehiclePlate(selectedVehicleId)}` 
            : 'Todas as Entregas'}
        </h2>
        <span className="bg-blue-500/20 text-blue-400 text-xs rounded-full px-2.5 py-1">
          {filteredDeliveries.length} entregas
        </span>
      </div>

      {filteredDeliveries.length > 0 ? (
        <div className="flex-1 overflow-y-auto">
          {filteredDeliveries.map((delivery) => {
            const priorityInfo = getPriorityInfo(delivery.priority);
            
            return (
              <div 
                key={delivery.id}
                className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors duration-150"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">{delivery.customer}</h3>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${priorityInfo.color} bg-opacity-20`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{delivery.address}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-lg ${
                        delivery.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                        delivery.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                        delivery.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {getStatusIcon(delivery.status)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="col-span-1">
                      <p className="text-xs text-slate-500">Veículo</p>
                      <p className="text-sm text-slate-300">{getVehiclePlate(delivery.vehicleId)}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-slate-500">Itens</p>
                      <p className="text-sm text-slate-300">{delivery.items}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-xs text-slate-500">Status</p>
                      <p className="text-sm text-slate-300">{getStatusLabel(delivery.status)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs">
                    <div className="text-slate-500">
                      {delivery.status === 'completed' || delivery.status === 'cancelled' ? (
                        <span>Finalizado {timeElapsed(delivery.estimatedDelivery)}</span>
                      ) : (
                        <span>Entrega estimada: {formatDate(delivery.estimatedDelivery)}</span>
                      )}
                    </div>
                    <button className="text-blue-400 hover:text-blue-300">Ver detalhes</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="bg-slate-700/30 rounded-full p-3 mx-auto w-fit mb-4">
              <PackageX className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-slate-300 font-medium">Nenhuma entrega encontrada</h3>
            <p className="text-slate-500 text-sm mt-2">
              {selectedVehicleId 
                ? "Este veículo não possui entregas ativas no momento." 
                : "Não há entregas registradas no sistema."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
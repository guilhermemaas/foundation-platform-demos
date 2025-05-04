import React from 'react';
import { Vehicle } from '../../types';
import { Truck, Clock, AlertTriangle, CheckCircle, User, Fuel, Thermometer } from 'lucide-react';
import { getStatusColor, getStatusLabel, timeElapsed } from '../../utils/helpers';
import * as LucideIcons from 'lucide-react';

interface VehicleStatsProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
}

const VehicleStats: React.FC<VehicleStatsProps> = ({ vehicles, selectedVehicle }) => {
  // Calculate stats
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const inactiveVehicles = vehicles.filter(v => v.status === 'inactive').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;
  
  const getVehicleTypeIcon = (type: string) => {
    switch (type) {
      case 'truck':
        return <Truck className="w-4 h-4" />;
      case 'motorcycle':
        return <LucideIcons.Navigation className="w-4 h-4" />;
      case 'van':
      default:
        return <LucideIcons.Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Fleet Statistics */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700">
          <h2 className="font-bold text-white">Estatísticas da Frota</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="bg-green-500/10 rounded-lg p-4 flex items-center">
            <div className="p-3 rounded-full bg-green-500/20 text-green-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-xs text-green-400">Veículos Ativos</p>
              <p className="text-xl font-bold text-white">{activeVehicles}</p>
            </div>
          </div>
          <div className="bg-amber-500/10 rounded-lg p-4 flex items-center">
            <div className="p-3 rounded-full bg-amber-500/20 text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-xs text-amber-400">Veículos Inativos</p>
              <p className="text-xl font-bold text-white">{inactiveVehicles}</p>
            </div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 flex items-center">
            <div className="p-3 rounded-full bg-red-500/20 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-xs text-red-400">Em Manutenção</p>
              <p className="text-xl font-bold text-white">{maintenanceVehicles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Vehicle Details */}
      {selectedVehicle ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex-1">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="font-bold text-white">Detalhes do Veículo</h2>
            <div className={`px-2.5 py-1 rounded-full text-xs ${getStatusColor(selectedVehicle.status)} bg-opacity-20`}>
              {getStatusLabel(selectedVehicle.status)}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-full ${getStatusColor(selectedVehicle.status)}`}>
                {selectedVehicle.type === 'truck' ? (
                  <Truck className="h-6 w-6 text-white" />
                ) : selectedVehicle.type === 'motorcycle' ? (
                  <LucideIcons.Navigation className="h-6 w-6 text-white" />
                ) : (
                  <LucideIcons.Package className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">{selectedVehicle.plateNumber}</h3>
                <p className="text-slate-400">{selectedVehicle.type === 'truck' ? 'Caminhão' : selectedVehicle.type === 'motorcycle' ? 'Motocicleta' : 'Van'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <p className="text-xs text-slate-400 ml-2">Motorista</p>
                  </div>
                  <p className="text-white">{selectedVehicle.driver}</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <p className="text-xs text-slate-400 ml-2">Última Atualização</p>
                  </div>
                  <p className="text-white">{timeElapsed(selectedVehicle.lastUpdate)}</p>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Fuel className="h-4 w-4 text-slate-400" />
                  <p className="text-xs text-slate-400 ml-2">Nível de Combustível</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 h-2.5 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        selectedVehicle.fuel > 70 ? 'bg-green-500' : 
                        selectedVehicle.fuel > 30 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedVehicle.fuel}%` }}
                    ></div>
                  </div>
                  <p className="text-white ml-3 font-medium">{selectedVehicle.fuel}%</p>
                </div>
              </div>

              {selectedVehicle.temperature !== undefined && (
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Thermometer className="h-4 w-4 text-slate-400" />
                    <p className="text-xs text-slate-400 ml-2">Temperatura da Carga</p>
                  </div>
                  <p className="text-white">{selectedVehicle.temperature}°C</p>
                </div>
              )}

              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <LucideIcons.MapPin className="h-4 w-4 text-slate-400" />
                  <p className="text-xs text-slate-400 ml-2">Localização Atual</p>
                </div>
                <p className="text-white">Lat: {selectedVehicle.location.lat.toFixed(6)}, Lng: {selectedVehicle.location.lng.toFixed(6)}</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Ver Histórico
              </button>
              <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="bg-slate-700/30 rounded-full p-3 mx-auto w-fit mb-4">
              <Truck className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-slate-300 font-medium">Nenhum veículo selecionado</h3>
            <p className="text-slate-500 text-sm mt-2">
              Selecione um veículo no mapa para visualizar seus detalhes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleStats;
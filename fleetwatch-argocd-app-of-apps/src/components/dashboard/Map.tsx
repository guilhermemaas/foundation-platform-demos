import React, { useEffect, useRef, useState } from 'react';
import { Truck, Package, Navigation } from 'lucide-react';
import { Vehicle } from '../../types';
import { getStatusColor } from '../../utils/helpers';
import * as LucideIcons from 'lucide-react';

interface MapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicleId: string) => void;
}

const Map: React.FC<MapProps> = ({ vehicles, selectedVehicle, onSelectVehicle }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null);

  useEffect(() => {
    // This would normally be where we initialize a real map like Google Maps or Leaflet
    // For this demo, we're just simulating a map with CSS
    
    // In a real implementation, we would do something like:
    // const map = new google.maps.Map(mapRef.current, {
    //   center: { lat: -23.550520, lng: -46.633308 },
    //   zoom: 12,
    //   styles: darkMapStyles
    // });
    
    // vehicles.forEach(vehicle => {
    //   const marker = new google.maps.Marker({
    //     position: vehicle.location,
    //     map: map,
    //     icon: getVehicleIcon(vehicle.type, vehicle.status)
    //   });
    // });
  }, [vehicles]);

  // Get a deterministic x, y position within container for our fake vehicles
  const getPositionStyle = (lat: number, lng: number) => {
    // Normalize the coordinates to a percentage within our container
    // This is just for demonstration - in a real map API these would be real coords
    const x = ((lng + 46.66) * 100) % 85 + 5; // Ensure it stays within view
    const y = ((lat + 23.57) * 100) % 80 + 5;
    
    return {
      left: `${x}%`,
      top: `${y}%`
    };
  };

  // Get the appropriate Lucide icon for the vehicle type
  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'truck':
        return <Truck className="h-full w-full" />;
      case 'motorcycle':
        return <Navigation className="h-full w-full" />;
      case 'van':
      default:
        return <Package className="h-full w-full" />;
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
        <h2 className="font-bold text-white">Mapa de Frota</h2>
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 mr-1.5"></span>
            Ativo
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5"></span>
            Inativo
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5"></span>
            Manutenção
          </span>
        </div>
      </div>

      <div className="flex-1 relative bg-slate-900 p-3 overflow-hidden" ref={mapRef}>
        {/* Fake map grid and elements */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 opacity-20 pointer-events-none">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute left-0 right-0 h-px bg-slate-600" style={{ top: `${(i / 12) * 100}%` }}></div>
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute top-0 bottom-0 w-px bg-slate-600" style={{ left: `${(i / 12) * 100}%` }}></div>
          ))}
        </div>

        {/* Fake roads */}
        <div className="absolute left-[10%] right-[10%] top-[30%] h-3 bg-slate-700/50 rounded"></div>
        <div className="absolute left-[20%] top-[10%] bottom-[20%] w-3 bg-slate-700/50 rounded"></div>
        <div className="absolute left-[50%] top-[40%] bottom-[10%] w-3 bg-slate-700/50 rounded"></div>
        <div className="absolute left-[60%] right-[5%] top-[60%] h-3 bg-slate-700/50 rounded"></div>
        <div className="absolute left-[75%] top-[20%] bottom-[40%] w-3 bg-slate-700/50 rounded"></div>
        
        {/* Map markers for vehicles */}
        {vehicles.map((vehicle) => {
          const isSelected = selectedVehicle?.id === vehicle.id;
          const isHovered = hoveredVehicle === vehicle.id;
          
          return (
            <React.Fragment key={vehicle.id}>
              {/* Vehicle position dot */}
              <div 
                className={`absolute w-7 h-7 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-125 z-20' : isHovered ? 'scale-110' : ''
                }`}
                style={getPositionStyle(vehicle.location.lat, vehicle.location.lng)}
                onClick={() => onSelectVehicle(vehicle.id)}
                onMouseEnter={() => setHoveredVehicle(vehicle.id)}
                onMouseLeave={() => setHoveredVehicle(null)}
              >
                <div className={`relative w-full h-full rounded-full p-1 ${getStatusColor(vehicle.status)}`}>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current"></div>
                  <div className="h-full w-full bg-slate-800 rounded-full flex items-center justify-center text-white">
                    {getVehicleIcon(vehicle.type)}
                  </div>
                </div>
              </div>
              
              {/* Vehicle popup info when selected */}
              {(isSelected || isHovered) && (
                <div 
                  className="absolute z-30 bg-slate-800 rounded-lg shadow-lg p-3 min-w-56 transform -translate-x-1/2 transition-opacity duration-200"
                  style={{
                    ...getPositionStyle(vehicle.location.lat, vehicle.location.lng),
                    marginTop: '-50px',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{vehicle.plateNumber}</h3>
                      <p className="text-sm text-slate-400">{vehicle.driver}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)} bg-opacity-20`}>
                      {vehicle.status === 'active' ? 'Ativo' : 
                       vehicle.status === 'inactive' ? 'Inativo' : 'Em Manutenção'}
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs text-slate-300">
                      <LucideIcons.Fuel className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      Combustível: {vehicle.fuel}%
                      <div className="ml-1.5 h-1.5 w-12 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            vehicle.fuel > 70 ? 'bg-green-500' : 
                            vehicle.fuel > 30 ? 'bg-amber-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${vehicle.fuel}%` }}
                        ></div>
                      </div>
                    </div>
                    {vehicle.temperature !== undefined && (
                      <div className="flex items-center text-xs text-slate-300">
                        <LucideIcons.Thermometer className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        Temperatura: {vehicle.temperature}°C
                      </div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Zoom controls - these would be functional in a real implementation */}
        <div className="absolute right-3 bottom-20 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-slate-800 rounded-md shadow-lg flex items-center justify-center text-white hover:bg-slate-700">
            <LucideIcons.Plus className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 bg-slate-800 rounded-md shadow-lg flex items-center justify-center text-white hover:bg-slate-700">
            <LucideIcons.Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Map attribution */}
        <div className="absolute left-3 bottom-3 text-xs text-slate-500">
          © FleetWatch Maps | Simulação
        </div>
      </div>
    </div>
  );
};

export default Map;
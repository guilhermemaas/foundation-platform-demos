import React, { useState } from 'react';
import { vehicles, deliveries } from '../../data';
import Map from './Map';
import DeliveryList from './DeliveryList';
import VehicleStats from './VehicleStats';
import { Vehicle } from '../../types';

const Dashboard: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  const selectedVehicle = selectedVehicleId 
    ? vehicles.find(v => v.id === selectedVehicleId) || null 
    : null;

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId === selectedVehicleId ? null : vehicleId);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-white">Dashboard de Monitoramento</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
        {/* Map section - takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2 h-full">
          <Map 
            vehicles={vehicles} 
            selectedVehicle={selectedVehicle} 
            onSelectVehicle={handleSelectVehicle} 
          />
        </div>
        
        {/* Stats section - takes 1/3 of the width on large screens */}
        <div className="h-full">
          <VehicleStats vehicles={vehicles} selectedVehicle={selectedVehicle} />
        </div>
      </div>
      
      {/* Delivery list section - full width */}
      <div className="h-[300px]">
        <DeliveryList 
          deliveries={deliveries} 
          vehicles={vehicles} 
          selectedVehicleId={selectedVehicleId} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
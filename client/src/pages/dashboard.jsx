import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardGlobal from '../components/dashboardcomp/dashbaordglobal';
import SortDashboard from '../components/dashboardcomp/dashboardsort/SortDashboard';
import TreeDashboard from '../components/dashboardcomp/dashboardtrees/TreeDashboard';
import GraphDashboard from '../components/dashboardcomp/dashboardgraphs/GraphDashboard';

export default function DashboardPage({ initialArena = null, onGoHome }) {
  const [activeArena, setActiveArena] = useState(initialArena);
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  // Synchronize when initialArena changes
  useEffect(() => {
    setActiveArena(initialArena);
    setSelectedAlgo(null);
  }, [initialArena]);

  const handleSelectArena = (arenaId) => {
    setActiveArena(arenaId);
    setSelectedAlgo(null);
  };

  const renderActiveContent = () => {
    if (activeArena === 'sort' || activeArena === 'sorting') {
      return (
        <SortDashboard 
          selectedAlgo={selectedAlgo}
          onSelectAlgo={setSelectedAlgo}
          onBack={() => {
            if (selectedAlgo) {
              setSelectedAlgo(null);
            } else {
              setActiveArena(null);
            }
          }} 
        />
      );
    }
    if (activeArena === 'trees') {
      return (
        <TreeDashboard 
          selectedAlgo={selectedAlgo}
          onSelectAlgo={setSelectedAlgo}
          onBack={() => {
            if (selectedAlgo) {
              setSelectedAlgo(null);
            } else {
              setActiveArena(null);
            }
          }} 
        />
      );
    }
    if (activeArena === 'graphs') {
      return (
        <GraphDashboard 
          selectedAlgo={selectedAlgo}
          onSelectAlgo={setSelectedAlgo}
          onBack={() => {
            if (selectedAlgo) {
              setSelectedAlgo(null);
            } else {
              setActiveArena(null);
            }
          }} 
        />
      );
    }
    return (
      <DashboardGlobal 
        onSelectArena={(arenaId) => {
          setActiveArena(arenaId);
          setSelectedAlgo(null);
        }} 
      />
    );
  };

  return (
    <DashboardLayout
      activeArena={activeArena}
      onSelectArena={handleSelectArena}
      selectedAlgo={selectedAlgo}
      onSelectAlgo={setSelectedAlgo}
      onGoHome={onGoHome}
    >
      {renderActiveContent()}
    </DashboardLayout>
  );
}

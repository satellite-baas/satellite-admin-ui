import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Main from './Main';

const Dashboard = ({
  satellites,
  currentSatellite,
  changeSatellite,
  handleNewSatellite,
  handleLogout,
  handleClearDone,
  loading,
  done,
  handleDestroySatellite,
  loadingDestroy,
  doneDestroy,
  clearDone,
  satellite
}) => {
  return (
    <>
      <Header 
        satellites={satellites}
        currentSatellite={currentSatellite}
        changeSatellite={changeSatellite}
        handleNewSatellite={handleNewSatellite}
        handleLogout={handleLogout}
        handleClearDone={handleClearDone}
        loading={loading}
        done={done}
      />
      <div className="columns is-fullheight is-gapless">
        <div className="column is-one-fifth nav-container">
          <Navbar />
        </div>          
        <div className="column is-four-fifths">
          <Main 
            satellite={satellite}
            handleDestroySatellite={handleDestroySatellite}
            loading={loadingDestroy}
            done={doneDestroy}
            clearDone={clearDone}
          />
        </div>          
      </div>
    </>
  );
};

export default Dashboard;
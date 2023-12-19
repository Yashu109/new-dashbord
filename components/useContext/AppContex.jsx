// AppContext.js

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showHome, setShowHome] = useState(false);

  const toggleHome = () => {
    setShowHome(prevShowHome => !prevShowHome);
  };

  return (
    <AppContext.Provider value={{ showHome, toggleHome }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

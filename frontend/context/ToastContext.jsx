// ToastContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastHeader, setToastHeader] = useState('');
  const [toastBackgroundColor, setToastBackgroundColor] = useState(''); // Default to primary
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message, header, backgroundColor="bg-success" ) => {
    setToastMessage(message);
    setToastHeader(header);
    setToastBackgroundColor(backgroundColor);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000); // Hide after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToastMessage, toastMessage, toastHeader, toastBackgroundColor, showToast, setShowToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
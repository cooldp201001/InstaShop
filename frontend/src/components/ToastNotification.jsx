// Toast.js
import React from 'react';
import { useToast } from '../../context/ToastContext';

const ToastNotification = () => {
  const { toastMessage, toastHeader, toastBackgroundColor, showToast, setShowToast } = useToast();

  return (
    <div
      className={`toast position-fixed bottom-0 end-0 m-4 ${showToast ? 'show' : 'hide'} ${toastBackgroundColor}` }
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
     
    >
      <div className="toast-header ">
        <strong className="me-auto">{toastHeader}</strong>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setShowToast(false)}
        ></button>
      </div>
      <div className="toast-body text-white">
        <h6>{toastMessage}</h6>
      </div>
    </div>
  );
};

export default ToastNotification;
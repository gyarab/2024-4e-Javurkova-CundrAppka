import React from 'react';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
  return (
    <div className="vintage-alert-overlay">
      <div className="vintage-alert-box">
        <div className="vintage-alert-header">
          <span className="vintage-alert-icon">🌍</span>
          <h3>Whoops! Something Went Wrong...</h3>
        </div>
        <p className="vintage-alert-message">{message}</p>
        <button className="vintage-alert-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomAlert;

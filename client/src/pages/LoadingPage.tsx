import React, { useEffect, useState } from 'react';
import 'styles/Loading.css';
import BackpackSVG from 'assets/images/backpack.svg'

const LoadingPage = ({ message = 'Getting ready for your adventure...' }: { message?: string }) => {

  return (
    <div className="loading-page">
      <div className="loading-content">
        <img
          src={BackpackSVG} // Replace with your backpack icon URL
          alt="Backpack"
          className="backpack-icon"
        />
        <h1 className="loading-message">{message}</h1>
      </div>
    </div>
  );
};

export default LoadingPage;

import React, { useState } from 'react';
import './AlertBox.css'; // We'll define this next

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleAlert = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="App">
      <button onClick={toggleAlert}>Show Alert</button>
      
      {isVisible && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h2>Alert!</h2>
            <p>This is a centered alert box.</p>
            <button onClick={toggleAlert}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
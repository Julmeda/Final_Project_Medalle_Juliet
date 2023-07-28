import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import App from './App';


// Create a root React DOM renderer to enable Concurrent Mode
const root = ReactDOM.createRoot(document.getElementById("root"));

// Create a root React DOM renderer to enable Concurrent Mode
root.render(
  // Render the App component inside the root React DOM renderer with StrictMode enabled
  <React.StrictMode>
    {/* StrictMode is a wrapper component provided by React for development mode */}
    {/* It helps highlight potential problems and warns about unsafe practices */}
    <App />
    {/* Render the main component of the React application, which is the App component */}
  </React.StrictMode>
);

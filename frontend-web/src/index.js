import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider,UserProvider } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

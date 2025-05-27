import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import userReducer from './Store/UserSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './theme.css';
import { DesignProvider } from './DesignProvider';

const store = configureStore({
  reducer: {
    user: userReducer
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DesignProvider>
        <PrimeReactProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PrimeReactProvider>
      </DesignProvider>
    </Provider>
  </StrictMode>
);
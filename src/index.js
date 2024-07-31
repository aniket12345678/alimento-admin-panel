import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Store } from './app/redux/Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <ErrorBoundary fallback={<div>some error</div>}>
      <App />
      <ToastContainer />
    </ErrorBoundary>
  </Provider>
);

reportWebVitals();

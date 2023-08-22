import React from 'react';
import ReactDOM from 'react-dom/client';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<CryptoContext>
  <App />
</CryptoContext>);
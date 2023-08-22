
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';


if (import.meta.env.PROD) {
  const root = document.createElement('div')
  root.id = 'code-glam-root'
  document.body.appendChild(root)
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App initEnabled/>
    </React.StrictMode>,
  )
}



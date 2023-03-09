import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { FindYourFlow } from './FindYourFlow';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <FindYourFlow />
  </BrowserRouter>

);
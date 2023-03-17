import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { FindYourFlow } from './FindYourFlow';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <FindYourFlow />
    </ChakraProvider>
  </BrowserRouter>

);
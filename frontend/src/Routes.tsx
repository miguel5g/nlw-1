import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home/Index';
import CreatePoint from './pages/CreatePoint/Index';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path='/' exact />
      <Route component={CreatePoint} path='/create-point' />
    </BrowserRouter>
  )
}

export default Routes;
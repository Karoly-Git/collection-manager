import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import CollectionsLayout from './components/layouts/CollectionsLayout';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<h1>Home</h1>} />
      <Route path='collections' element={<CollectionsLayout />} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Route>
  )
);


function App() {

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div >
  );
}

export default App;

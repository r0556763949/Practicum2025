//style:
import './App.css'
import './styles/styles.css'
import './styles/load.css'
import './styles/File.css'
import "./styles/Client.css";
import "./styles/Project.css"
import "./styles/Popaps.css"
import "./styles/popapPassword.css"
import {  RouterProvider } from 'react-router-dom'; 
import { Router } from './Routers'
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store/Store';

function App() {

  return (
      <>
          <React.StrictMode>
        <Provider store={store}>

        <RouterProvider router={Router} />
        </Provider>
    </React.StrictMode>
      </>
  )
}

export default App

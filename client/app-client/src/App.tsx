//style:
import './App.css'
import './styles/new.css'
import './styles/questionnaire-fill.css'
import './styles/dashboard.css'
import "./styles/home.css"
import "./styles/header.css"
import "./styles/calender.css"


import { RouterProvider } from 'react-router-dom';
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

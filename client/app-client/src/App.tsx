
import './App.css'
import {  RouterProvider } from 'react-router-dom'; 
import { Router } from './Routers'
import { motion } from 'framer-motion';
import './styles.css';

function App() {

  return (
      <>
        <RouterProvider router={Router} />
      </>
  )
}

export default App

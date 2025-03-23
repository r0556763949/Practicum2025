
import './App.css'
import {  RouterProvider } from 'react-router-dom'; 
import { Router } from './Routers'
import { motion } from 'framer-motion';

function App() {

  return (
      <>
        <RouterProvider router={Router} />
{/* עיצוב כללי */}
<div className="min-h-screen bg-white text-black">
        {/* כותרת */}
        <header className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">App Title</h1>
        </header>

        {/* תוכן */}
        <main className="p-6">
          {/* טופס לדוגמה */}
          <div className="mb-8 p-6 shadow-md rounded-2xl bg-gray-50">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Form Example</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-blue-600 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-2xl transition-colors duration-200 hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600"
              >
                Submit
              </button>
            </form>
          </div>

          {/* פופאפ הצלחה */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-2xl bg-green-100 text-green-800 flex items-center space-x-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5 4a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Success! Your action was completed.</span>
          </motion.div>
        </main>
      </div>
      </>
  )
}

export default App

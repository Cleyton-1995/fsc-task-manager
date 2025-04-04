import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import App from './App.jsx';
import TaskDetailsPage from './pages/TaskDetailsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/tasks/:taskId',
    element: <TaskDetailsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        style: {
          color: '#35383E',
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);

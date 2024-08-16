import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import router from './Router/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router} />
        <ToastContainer />

      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)

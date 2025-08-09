import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './Contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import router from './Router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              color: 'white',
              fontWeight: '500',
              borderRadius: '10px',
              padding: '12px 16px',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#06b6d4',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              color: 'white',
              fontWeight: '500',
              borderRadius: '10px',
              padding: '12px 16px',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#f97316',
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
)

import { createRoot } from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import AuthContextProvider from './context/AuthContext.js'

createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
)

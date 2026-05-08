import { createRoot } from 'react-dom/client'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
// import AuthContextProvider from '/Users/JS/Desktop/Files/Coding/Websites/Personal Projects/syncTask/context/AuthContext.jsx'
// import AuthContextProvider from '../'

createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
)

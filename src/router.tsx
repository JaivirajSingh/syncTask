import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import TodoList from './routes/TodoList';
import RootRedirect from './routes/RootRedirect';
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootRedirect />,
        },
        {
            path: '/SignIn',
            element: <SignIn />,
        },
        {
            path: '/SignUp',
            element: <SignUp />,
        },
        {
            path: '/TodoList',
            element: <TodoList />,
        }
    ]
)
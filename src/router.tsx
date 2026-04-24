import SignIn from './components/Signin'
import TodoList from './routes/TodoList';
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <SignIn />,
        },
        {
            path: '/Todolist',
            element: <TodoList />,
        }
    ]
)
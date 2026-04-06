import TaskDisplay from "./TaskDisplay"
import AddTask from "./AddTask"
import { useState } from "react"

export default function App() {
    const [tasks, setTasks] = useState<string[]>([])
    
    return (
        <>
            <TaskDisplay tasks={tasks}/>
            <AddTask setTasks={setTasks}/>
        </>
    )
}
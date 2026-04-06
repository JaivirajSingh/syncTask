import { useState } from "react"

export default function TodoList() {
    const [tasks, setTasks] = useState<string[]>([])

    // Maps over the array of tasks
    const taskList = tasks.map((task, index) => (           
            <li key={index}>
                <input className="bg-white" type="checkbox" />    
                {task}
            </li>
    ))

    function addTask(formData: FormData) {
        const newTask = formData.get("task") as string
        setTasks((prevTasks: string[]) => [...prevTasks, newTask])
    }

    return (
        <>
            <div className="flex justify-center">
                <ul>{taskList}</ul>
            </div>

            {/* Add task form */}
            <form action={addTask}>
                <input className="bg-white" type="text" name="task" required/>
                <button className="bg-white">Add task</button>
            </form>
        </>    
    )
}
type AddTaskProps = {
    setTasks: React.Dispatch<React.SetStateAction<string[]>>
}

export default function AddTask(props: AddTaskProps) {
    function addTask(formData: FormData) {
        const newTask = formData.get("task") as string
        props.setTasks((prevTasks: string[]) => [...prevTasks, newTask])
    }

    return (
        <>
            <form action={addTask} className="add-task">
                <input className="bg-white" type="text" name="task" required/>
                <button className="bg-white">Add task</button>
            </form>
        </>    
    )
}
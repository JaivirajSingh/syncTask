import { useState, useEffect, useActionState } from "react"
import supabase from "./supabase-client"

interface Task {
    title: string
}

export default function TodoList() {    
    const [tasks, setTasks] = useState<Task[]>([])

    // Supabase code
    useEffect(() => {
        fetchTasks()

        const channel = supabase
        .channel('deal-changes')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'tasks'
            },
            (_) => {
                fetchTasks()
            })
        .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    async function fetchTasks() {
        try {
            const {data, error} = await supabase
            .from('tasks')
            .select(
                `
                title
                `
            )
        if (error) {
            throw error;
        }
        setTasks(data)
        } catch (error) {
            console.error('Error fetching metrics', error)
        }
    }

    // Pushes new task to local state and supabase 
    const [taskState, submitTask, isPending] = useActionState(
        async (_, formData: FormData) => {

            const newTask = {
                title: formData.get('task-title') as string
            }
            setTasks(prevTasks => [...prevTasks, {title: newTask.title}])   

            const { error } = await supabase.from('tasks').insert(newTask)
        
            if (error) {
                console.error('Error adding task: ', error.message)
                return new Error('Failed to add task')
            }

            return null
        },
        null
    )

    // Maps over the array of tasks
    const taskList = tasks.map((task, index) => (    
            <li key={index}>
                <input onChange={() => deleteTask(index)} className="bg-white" type="checkbox" />    
                {task.title}
            </li>
    ))

    function deleteTask(index: number) {
        const updatedList = tasks.filter((_, i) => i !== index)
        setTasks(updatedList)
    }

    return (
        <>
            <div className="flex justify-center">
                <ul>{taskList}</ul>
            </div>

            {/* Add task form */}
            <form action={submitTask}>
                <input className="bg-white" type="text" name="task-title" required/>
                <button disabled={isPending} className="bg-white">Add task</button>
            </form>
        </>    
    )
}
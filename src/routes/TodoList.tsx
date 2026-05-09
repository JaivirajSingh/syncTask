import { useState, useEffect } from "react"
import supabase from "../supabase-client"
import { useActionState } from "react"

interface Task {
    title: string
    uuid: string
}

export default function TodoList() {    
    const [tasks, setTasks] = useState<Task[]>([])

    // Supabase code
    useEffect(() => {
        fetchTasks()

        const channel = supabase
        .channel('task-changes')
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

    // Fetches all tasks from supabase and updates state
    async function fetchTasks() {
        try {
            const {data, error} = await supabase
            .from('tasks')
            .select(
                `
                title,
                uuid
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

    // Adds new task to local state and then supabase 
    const [_taskState, submitTask, isPending] = useActionState(
        async (_, formData: FormData) => {

            const newTask = {
                title: formData.get('task-title') as string,
                uuid: crypto.randomUUID() as string
            }

            // Updates local state before supabase call
            setTasks(prevTasks => [...prevTasks, newTask])   


            const { error } = await supabase.from('tasks').insert(newTask)
        
            if (error) {
                console.error('Error adding task: ', error.message)
                return new Error('Failed to add task')
            }

            return null
        },
        null
    )

    async function deleteTask(uuid: string) {
        setTasks(prevTasks => prevTasks.filter(task => task.uuid !== uuid))
        const { error } = await supabase.from('tasks').delete().eq('uuid', uuid)
    }

    // Maps over the array of tasks
    const taskList = tasks.map((task) => (    
            <li key={task.uuid}>
                <input onChange={() => deleteTask(task.uuid)} className="bg-white" type="checkbox" />    
                {task.title}
            </li>
    ))

    return (
        <>
            <div className="flex justify-center">
                <ul>{taskList}</ul>
            </div>

            {/* Add task form */}
            <form action={submitTask}>
                <input disabled={isPending} className="bg-white" type="text" name="task-title" required/>
                <button disabled={isPending} className="bg-white">Add task</button>
            </form>
        </>    
    )
}
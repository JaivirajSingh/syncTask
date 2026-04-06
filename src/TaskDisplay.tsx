type TaskDisplayProps = {
    tasks: string[]
}

export default function TaskDisplay(props: TaskDisplayProps) {
    const taskList = props.tasks.map((task, index) => (           
            <li key={index}>
                <input className="bg-white" type="checkbox" />    
                {task}
            </li>
    ))

    return (
        <div className="flex justify-center">
            <ul>{taskList}</ul>
        </div>
    )
}
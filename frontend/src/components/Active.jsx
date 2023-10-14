import React from 'react';
import Task from './Task/Task';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
function Active() {
    // Accessing the tasks from the TaskContext using the useContext hook.
    const { tasks } = useContext(TaskContext);
    return ( 
        <div>
        {
             // Check if there are tasks in the tasks array.
            (tasks.length !==0) ? (
                tasks.map((task, index) => {
                    return (
                        !task.terminée && <Task
                            key={index}
                            task={task}
                            id={index}
                        />
                    )
                })
            ) : (
                <h1>No Task Found</h1>
            )
        }
    </div>
     );
}

export default Active;
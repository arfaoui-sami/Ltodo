import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
    return ( 
        <div className=' flex-grow'>
            <nav>
                <ul className='flex gap-3 justify-between p-3 bg-violet-200 rounded-lg shadow-2xl'>
                    <li>
                        <NavLink to="/">Tasks</NavLink>
                    </li>
                   
                    <li>
                        <NavLink to="/completed">Completed</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default TaskIndicator;
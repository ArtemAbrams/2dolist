import React, { useState, useEffect } from 'react';
import './todoliststyle.css';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const saveTasksToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleAddTask = () => {
        if (taskText.trim() === '') {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setTaskText('');
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    return (
        <div className="todo-container">
            <h2>Tasks</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="task-input"
            />
            <button onClick={handleAddTask} className="add-button">Add Task</button>
        </div>
    );
};






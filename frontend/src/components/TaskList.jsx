import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TaskList.module.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    //useEffect is a React hook that runs a function after the component mounts.
    //Inside the useEffect hook, the function fetchTasks() is called.
    //Empty array as the 2nd argument means that this effect will run only once.
    useEffect(() => {
        fetchTasks();
    }, []);

    //Defines an asynchronous function called fetchTasks using an arrow function.
    //Declaring it as async allows the function to use the await keyword inside.
    //The function makes an HTTP GET request to the server to fetch the tasks.
    //The await keyword pauses the function execution until
    //the request completes and the response is received.
    //If the request is successful, res will contain the HTTP response object
    //If an error occurs during the request, the catch will handle the error.
    const fetchTasks = async () => {
        try {
            const res = await axios.get('https://task-api.thecodefarmer.com/api/tasks/');
            setTasks(res.data);
        }
        catch (err) {
            console.log('Error fetching tasks: ', err);
            setErr('Failed to fetch data from the server');
        }
    };

    //HTTP POST request is sent to the server.
    //This request includes a JSON object { title: newTask } as the data payload.
    const addTask = async () => {

         //Returns early and does not add a new task, if newTask is empty.
        if (!newTask) return;

        try {
            const res = await axios.post('https://task-api.thecodefarmer.com/api/tasks/', {
                title: newTask,
                completed: false
            });

            setTasks([...tasks, res.data]);
            setNewTask('');
        }
        catch (err) {
            console.log('Error creating task: ', err);
            setErr('Failed to create task');
        }
    };

    //This is used to toggle the "completed" status of a specific task.
    //It sends a PATCH request to update the tasks "completed" status
    //when a user clicks on a task to mark it as completed or incomplete.
    //via the onClick event handler of the task element.
    const toggleComplete = async (task) => {
        try {
            const res = await axios.patch
            (`https://task-api.thecodefarmer.com/api/tasks/${task.id}/`, {
                completed: !task.completed
            });

            setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
        }
        catch (err) {
            console.log('Error updating task: ', err);
            setErr('Failed to update task');
        }
    };

    //Function that takes the ID of the task to delete as an argument.
    //When a user clicks the "Delete" button next to a task,
    //this function is called via the onClick event handler of the delete button.
    const deleteTask = async (id) => {
        try {
            await axios.delete(`https://task-api.thecodefarmer.com/api/tasks/${id}/`);
            setTasks(tasks.filter((t) => t.id !== id));
        }
        catch (err) {
            console.log('Error deleting task: ', err);
            setErr('Failed to delete task');
        }
    };
  
    return (
        <div className={styles.TaskList}>
            <h1>Task List</h1>

            <div>
                <input
                    name="newTask"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="My Task..."
                />
                
                <button
                className={styles.addButton}
                    onClick={addTask}>
                    Add Task
                </button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{ textDecoration: task.completed
                                ? 'line-through'
                                : 'none' }}
                                onClick={() => toggleComplete(task)}>
                            {task.title}
                        </span>
                        <button
                            className={styles.deleteButton}
                            onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );

};

export default TaskList;
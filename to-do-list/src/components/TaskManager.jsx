import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineUp, AiOutlineDown, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [showHistory]);

  const fetchTasks = async () => {
    try {
      if (showHistory) {
        const { data } = await axios.get('http://localhost:5000/tasks/history');
        setTasks(data);
      } else {
        const { data } = await axios.get('http://localhost:5000/tasks');
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!taskName.trim()) return;
    try {
      await axios.post('http://localhost:5000/tasks/add', { title: taskName, priority: 0, completed: false });
      setTaskName('');
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/complete/${id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const updatePriority = async (id, direction) => {
    try {
      await axios.put(`http://localhost:5000/tasks/priority/${id}`, { direction });
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-manager">
      <div className="form-container">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add Task</button>
        <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Show Current Tasks' : 'Show Task History'}
        </button>
      </div>
      <div className="task-list">
        <h1>Task Manager</h1>
        {showHistory ? (
          <div className="history-section">
            <h2>Task History</h2>
            {tasks.map(task => (
              <div className="task" key={task._id}>
                <p>
                  {task.title} - Completed at {new Date(task.completedAt).toLocaleString('en-IN')}
                </p>
                <button onClick={() => deleteTask(task._id)}>
                  <AiOutlineCloseCircle />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h2>Current Tasks</h2>
            {tasks.map(task => (
              <div className={`task ${task.completed ? 'complete' : ''}`} key={task._id}>
                <p>
                  {task.title} - Priority: {task.priority} - Created at {new Date(task.createdAt).toLocaleString('en-IN')}
                </p>
                <button onClick={() => updatePriority(task._id, 'up')}>
                  <AiOutlineUp />
                </button>
                <button onClick={() => updatePriority(task._id, 'down')}>
                  <AiOutlineDown />
                </button>
                <button onClick={() => markCompleted(task._id)}>
                  <AiOutlineCheckCircle /> Complete
                </button>
                <button onClick={() => deleteTask(task._id)}>
                  <AiOutlineCloseCircle />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskManager;

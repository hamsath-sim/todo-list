import { useState, useEffect, useReducer, useRef } from 'react';
import './App.css';


function taskReducer(tasks, action) {
  switch (action.type) {
    case 'ADD_TASK':
      if (!action.payload.trim()) return tasks; 
      return [...tasks, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TASK':
      return tasks.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'REMOVE_TASK':
      return tasks.filter(task => task.id !== action.payload);
    default:
      return tasks;
  }
}

function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); 
  }, []);

  const addTask = () => {
    dispatch({ type: 'ADD_TASK', payload: taskText });
    setTaskText('');
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}>
              {task.text}
            </span>
            <button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

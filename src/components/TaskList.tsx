import { useEffect, useRef, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const inputEl = useRef<HTMLInputElement>(null)

  function handleCreateNewTask() {
    const isEmptyTitle = newTaskTitle
    const randomTaskId = Math.floor(Math.random() * 100000)

    if (!isEmptyTitle) {
      inputEl.current?.focus()
      return
    }

    const newTask: Task = {
      id: randomTaskId,
      title: newTaskTitle,
      isComplete: false
    }

    return setTasks(tasks => [...tasks, newTask])
  }

  function handleToggleTaskCompletion(id: number) {
    const taskItem = tasks.find(task => task.id === id)

    return setTasks((tasks) => {
      return tasks.map(task => task === taskItem
        ? { ...task, isComplete: !task.isComplete }
        : task
      )
    })
  }

  function handleRemoveTask(id: number) {
    const taskItem = tasks.find(task => task.id === id)

    return setTasks((tasks) => tasks.filter(task => task !== taskItem))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text"
            placeholder="Adicionar novo todo"
            ref={inputEl}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
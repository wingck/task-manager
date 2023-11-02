import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter.tsx";
import Task from "./task.ts";

import "./App.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const handleAddTask = (task: Omit<Task, "id">) => {
    console.log(task);
    const newTask: Task = {
      ...task,
      id: Date.now(),
    };
    newTask.dueDate.setHours(24);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
      <TaskFilter onSelectCategory={handleCategorySelection} />
      <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
"use client";

import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  // CREATE
  const addTask = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // UPDATE
  const updateTask = (id, updatedTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle.trim() }
          : task
      )
    );
  };

  // UPDATE completion status
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading tasks...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Stay organized
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Task Manager
          </h1>

          <p className="mt-3 text-slate-500">
            Organize your work, one task at a time.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <TaskForm onAddTask={addTask} />

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            totalTasks={totalTasks}
            pendingTasks={pendingTasks}
            completedTasks={completedTasks}
          />

          <TaskList
            tasks={filteredTasks}
            onUpdate={updateTask}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>

      </div>
    </main>
  );
}
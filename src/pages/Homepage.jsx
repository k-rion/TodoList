import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import Modal from '../components/Modal'

function Homepage() {

    const [tasks, setTasks] = React.useState(() => {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    });

      React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);

  return (
    <div className="flex flex-col justify-center w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">


      {/* Navbar Component */}
      <Navbar/>

      {/* Welcome Message */}
        <h1 className="my-10 text-2xl font-bold text-center sm:text-3xl lg:text-4xl text-primary animate-bounce">Welcome To Task App!</h1>
            
        <h2 className="mb-3 ml-1 text-xl font-bold sm:text-2xl lg:text-3xl">Today's Task</h2>
        <p className="mb-10 ml-1 text-sm sm:text-base lg:text-lg text-slate-500">Stay organized and productive</p>

      {/* Cards Component */}
      <Cards
          tasks={tasks}
          onToggleDone={(index) => {
            setTasks(prev =>
              prev.map((t, i) => i === index ? { ...t, done: !t.done } : t)
            );
          }}
          onDeleteTask={(index) => {
            setTasks(prev => prev.filter((_, i) => i !== index));
          }}
          onEditTask={(index, updatedTask) => {
            setTasks(prev =>
              prev.map((t, i) => (i === index ? { ...t, ...updatedTask } : t))
            );
          }}
        />

      {/* Open Create New Task*/}
      <div className="fixed flex justify-end bottom-6 right-6 sm:bottom-10 sm:right-10">
        <button
          className="transition-all duration-300 btn btn-outline btn-circle size-14 sm:size-16 hover:bg-primary hover:border-primary"
          onClick={() => document.getElementById("modal-task").showModal()}
        >
          <Plus className="text-white" size={24} />
        </button>
      </div>


       {/* Reusable modals */}
      <Modal
        titleHead= "Add New Task"
        id="modal-task"
        taskTitle=""
        description=""
        date=""
        time=""
        category=""
        onSubmit={(newTask) => {
          setTasks((prev) => [...prev, {...newTask, done :  false}]);
        }}
        onClose={() => document.getElementById("modal-task").close()}
      />
    </div>
  )
}

export default Homepage
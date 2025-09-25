import React from 'react'
import { Plus, Sparkles } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

import Navbar from '../components/Navbar'
import Cards from '../components/Cards'
import Modal from '../components/Modal'

function Homepage() {
  const [tasks, setTasks] = React.useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const openModal = () => {
    document.getElementById("modal-task").showModal()
  }

  const completedTasks = tasks.filter(task => task.done).length
  const totalTasks = tasks.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-blue-200 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bg-indigo-200 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-purple-200 rounded-full top-1/2 left-1/2 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Navbar Component */}
        <Navbar />

        {/* Toaster */}
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#374151',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }
          }} 
        />

        {/* Header Section */}
        <div className="mt-8 mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border border-blue-100 rounded-full shadow-sm bg-white/80 backdrop-blur-sm">
            <Sparkles className="text-blue-500" size={20} />
            <span className="text-sm font-medium text-blue-600">Stay Productive, Stay Organized</span>
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Your Tasks, 
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"> Simplified</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
            Manage your daily tasks with ease and focus on what matters most
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <div className="p-6 transition-shadow duration-300 border border-blue-100 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md">
            <div className="mb-2 text-3xl font-bold text-gray-900">{totalTasks}</div>
            <div className="text-gray-600">Total Tasks</div>
          </div>
          <div className="p-6 transition-shadow duration-300 border border-green-100 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md">
            <div className="mb-2 text-3xl font-bold text-gray-900">{completedTasks}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="p-6 transition-shadow duration-300 border border-purple-100 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-md">
            <div className="mb-2 text-3xl font-bold text-gray-900">{totalTasks - completedTasks}</div>
            <div className="text-gray-600">Pending</div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-16">
          <div className="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                My Tasks
              </h2>
              <p className="text-gray-600">
                {totalTasks === 0 ? 'No tasks yet' : `${completedTasks} of ${totalTasks} completed`}
              </p>
            </div>
            
            {/* Add Task Button */}
            <button
              className="flex items-center gap-3 px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl hover:scale-105 hover:shadow-xl sm:mt-0"
              onClick={openModal}
            >
              <Plus size={20} className="transition-transform group-hover:rotate-90" />
              Add New Task
            </button>
          </div>

          {/* Cards Component */}
          <Cards
            tasks={tasks}
            onToggleDone={(index) => {
              setTasks(prev =>
                prev.map((t, i) => i === index ? { ...t, done: !t.done } : t)
              )
            }}
            onDeleteTask={(index) => {
              setTasks(prev => prev.filter((_, i) => i !== index))
              toast.success('Task deleted successfully')
            }}
            onEditTask={(index, updatedTask) => {
              setTasks(prev =>
                prev.map((t, i) => (i === index ? { ...t, ...updatedTask } : t))
              )
              toast.success('Task updated successfully')
            }}
          />
        </div>

        {/* Create Task Modal */}
        <Modal
          titleHead="Create New Task"
          id="modal-task"
          taskTitle=""
          description=""
          date=""
          time=""
          category=""
          onSubmit={(newTask) => {
            setTasks((prev) => [...prev, {...newTask, done: false, id: Date.now()}])
            toast.success('Task created successfully 🎉')
          }}
          onClose={() => document.getElementById("modal-task").close()}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Homepage
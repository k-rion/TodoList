import React, { useState } from "react"
import { Trash2, Pencil, Calendar, Clock, Tag, CheckCircle, Circle, MoreVertical } from "lucide-react"
import Modal from "./Modal"

function Cards({ tasks, onToggleDone, onDeleteTask, onEditTask }) {
  const [editingIndex, setEditingIndex] = useState(null)
  const [deletingIndex, setDeletingIndex] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  if (!tasks || tasks.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 border border-blue-100 rounded-full bg-white/80 backdrop-blur-sm">
            <Calendar className="text-blue-400" size={32} />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-700">No tasks yet</h3>
          <p className="text-gray-500">Create your first task to get started!</p>
        </div>
      </div>
    )
  }

  const openEditModal = (index) => {
    setEditingIndex(index)
    setMenuOpen(null)
    document.getElementById("modal-edit").showModal()
  }

  const closeEditModal = () => {
    setEditingIndex(null)
    document.getElementById("modal-edit").close()
  }

  const getCategoryColor = (category) => {
    const colors = {
      "💼 Work": "bg-blue-100 text-blue-700 border-blue-200",
      "🏠 Personal": "bg-green-100 text-green-700 border-green-200",
      "📚 Study": "bg-purple-100 text-purple-700 border-purple-200",
      "❤️‍🩹 Health": "bg-red-100 text-red-700 border-red-200"
    }
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  const getCategoryIcon = (category) => {
    const icons = {
      "💼 Work": "💼",
      "🏠 Personal": "🏠",
      "📚 Study": "📚",
      "❤️‍🩹 Health": "❤️"
    }
    return icons[category] || "📝"
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task, index) => {
        const isDone = task.done
        const categoryColor = getCategoryColor(task.category)
        const categoryIcon = getCategoryIcon(task.category)

        return (
          <div
            key={task.id || index}
            className={`group bg-white/80 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:shadow-lg ${
              isDone ? "border-green-200 opacity-75" : "border-gray-200 hover:border-blue-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                {/* Checkbox and Content */}
                <div className="flex items-start flex-1 min-w-0 gap-4">
                  <button
                    onClick={() => onToggleDone(index)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 mt-1 ${
                      isDone 
                        ? "bg-green-500 border-green-500" 
                        : "border-gray-300 hover:border-green-500 group-hover:border-green-400"
                    } flex items-center justify-center`}
                  >
                    {isDone && <CheckCircle size={14} className="text-white" />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDone ? "line-through text-gray-400" : "text-gray-900"
                    }`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className={`text-gray-600 mb-3 ${
                        isDone ? "line-through" : ""
                      }`}>
                        {task.description}
                      </p>
                    )}

                    {/* Task Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{task.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{task.time}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full border ${categoryColor} flex items-center gap-1`}>
                        <span>{categoryIcon}</span>
                        {task.category.replace(/[^a-zA-Z]/g, '')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Menu */}
                <div className="relative flex-shrink-0">
                  <button
                    className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                    onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                  >
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>

                  {menuOpen === index && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-[120px]">
                      <button
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200 ${
                          isDone ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
                        }`}
                        disabled={isDone}
                        onClick={() => openEditModal(index)}
                      >
                        <Pencil size={14} className="inline mr-2" />
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-sm text-left text-red-600 transition-colors duration-200 hover:bg-red-50"
                        onClick={() => {
                          setDeletingIndex(index)
                          setMenuOpen(null)
                        }}
                      >
                        <Trash2 size={14} className="inline mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Edit Modal */}
      <Modal
        titleHead="Edit Task"
        id="modal-edit"
        taskTitle={editingIndex !== null ? tasks[editingIndex]?.title : ""}
        description={editingIndex !== null ? tasks[editingIndex]?.description : ""}
        date={editingIndex !== null ? tasks[editingIndex]?.date : ""}
        time={editingIndex !== null ? tasks[editingIndex]?.time : ""}
        category={editingIndex !== null ? tasks[editingIndex]?.category : ""}
        onSubmit={(updatedTask) => {
          if (editingIndex !== null) {
            onEditTask(editingIndex, updatedTask)
            setEditingIndex(null)
          }
        }}
        onClose={closeEditModal}
      />

      {/* Delete Confirmation Modal */}
      {deletingIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-xl rounded-2xl">
            <div className="mb-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-red-100 rounded-full">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                Delete Task?
              </h2>
              <p className="text-sm text-gray-600">
                This action cannot be undone. The task will be permanently deleted.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-xl"
                onClick={() => setDeletingIndex(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 font-medium text-white transition-all duration-200 bg-red-500 hover:bg-red-600 rounded-xl"
                onClick={() => {
                  onDeleteTask(deletingIndex)
                  setDeletingIndex(null)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards
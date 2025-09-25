import React, { useEffect, useState } from "react"
import { Calendar, Clock, Tag, FileText, X } from "lucide-react"

function Modal({ titleHead, id, taskTitle, description, date, time, category, onSubmit, onClose }) {
  const [formTaskTitle, setFormTaskTitle] = useState(taskTitle || "")
  const [formDescription, setFormDescription] = useState(description || "")
  const [formDate, setFormDate] = useState(date || "")
  const [formTime, setFormTime] = useState(time || "")
  const [formCategory, setFormCategory] = useState(category || "")

  const resetForm = () => {
    setFormTaskTitle("")
    setFormDescription("")
    setFormDate("")
    setFormTime("")
    setFormCategory("")
  }

  useEffect(() => {
    setFormTaskTitle(taskTitle || "")
    setFormDescription(description || "")
    setFormDate(date || "")
    setFormTime(time || "")
    setFormCategory(category || "")
  }, [taskTitle, description, date, time, category])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({
      title: formTaskTitle,
      description: formDescription,
      date: formDate,
      time: formTime,
      category: formCategory,
    })
    resetForm()
    document.getElementById(id).close()
  }

  const handleClose = () => {
    resetForm()
    onClose?.()
    document.getElementById(id).close()
  }

  return (
    <dialog id={id} className="modal" aria-labelledby={`${id}-title`}>
      <div className="max-w-2xl p-0 bg-white border border-gray-200 shadow-2xl modal-box rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900" id={`${id}-title`}>
            {titleHead}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText size={16} className="text-blue-500" />
              Task Title
            </label>
            <input
              type="text"
              placeholder="What needs to be done?"
              required
              value={formTaskTitle}
              onChange={(e) => setFormTaskTitle(e.target.value)}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText size={16} className="text-blue-500" />
              Description
            </label>
            <textarea
              placeholder="Add some details about your task..."
              required
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full h-24 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 border border-gray-200 resize-none bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date and Category Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Date */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-blue-500" />
                Due Date
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Tag size={16} className="text-blue-500" />
                Category
              </label>
              <select
                value={formCategory}
                required
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" disabled hidden>Select category...</option>
                <option value="💼 Work">💼 Work</option>
                <option value="🏠 Personal">🏠 Personal</option>
                <option value="📚 Study">📚 Study</option>
                <option value="❤️‍🩹 Health">❤️‍🩹 Health</option>
              </select>
            </div>
          </div>

          {/* Time */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock size={16} className="text-blue-500" />
              Time
            </label>
            <input
              type="time"
              required
              value={formTime}
              onChange={(e) => setFormTime(e.target.value)}
              className="w-full px-4 py-3 text-gray-900 transition-all duration-200 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 font-medium text-white transition-all duration-200 transform bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl hover:scale-105"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
      
      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  )
}

export default Modal
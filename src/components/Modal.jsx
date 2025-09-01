import React, { useEffect, useState } from "react";
import {ChevronDown} from 'lucide-react'

function Modal({ titleHead, id, taskTitle, description, date, time, category, onSubmit, onClose }) {

  const [formTaskTitle, setFormTaskTitle] = useState(taskTitle || "");
  const [formDescription, setFormDescription] = useState(description || "");
  const [formDate, setFormDate] = useState(date || "");
  const [formTime, setFormTime] = useState(time || "");
  const [formCategory, setFormCategory] = useState(category || "");

  const resetForm = () => {
    setFormTaskTitle("");
    setFormDescription("");
    setFormDate("");
    setFormTime("");
    setFormCategory("");
  };

  useEffect(() => {
    setFormTaskTitle (taskTitle || "");
    setFormDescription (description || "");
    setFormDate (date || "");
    setFormTime (time || "");
    setFormCategory (category || "");
  }, [ taskTitle, description, date, time, category]);

  return (
    <dialog id={id} className="modal" aria-labelledby={`${id}-title`}>
      <div className="modal-box">
        <h2 className="text-2xl font-bold text-center ">{titleHead}</h2>
        <form
          className="flex flex-col w-full gap-4 my-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.({
              title:formTaskTitle,
              description:formDescription, 
              taskTitle: formTaskTitle, 
              date:formDate, 
              time:formTime,
              category: formCategory,
            });
            resetForm();
            document.getElementById(id).close();
          }}
        >
          <input
            type="text"
            placeholder="Task Title"
            required
            value={formTaskTitle}
            onChange={(e) => setFormTaskTitle(e.target.value)}
            className="w-full text-white input input-bordered input-primary"
          />

          <textarea
            className="w-full h-24 text-white textarea textarea-primary"
            placeholder="Task Description"
            required
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          ></textarea>

          <div className="flex gap-2">
            <input
            type="date"
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
            className="w-full text-white input input-bordered input-primary"
            required
          />

          <select
              className="w-full text-white input input-bordered input-primary"
              value={formCategory}
              required
              onChange={(e) => setFormCategory(e.target.value)}
            >
              <option value="" disabled hidden>Select a category...</option>
              <option value="💼 Work">💼 Work</option>
              <option value="🏠 Personal">🏠 Personal</option>
              <option value="📚 Study">📚 Study</option>
              <option value="❤️‍🩹 Health">❤️‍🩹 Health</option>
            </select>
          </div>

          <input
            type="time"
            required
            className="w-full text-white input input-bordered input-primary"
            value={formTime}
            onChange={(e) => setFormTime(e.target.value)}
            
          />

          <button className="w-full btn btn-primary" type="submit">
            Save
          </button>
          <button
            className="bg-red-600 btn hover:bg-red-900"
            type="button"
            onClick={onClose}
            onclick={() => {
              resetForm();
              onClose?.();
              document.getElementById(id).close();
            }}
          >
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Modal;

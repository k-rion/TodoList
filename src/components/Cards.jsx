import React from "react";
import { Trash2, Pencil } from "lucide-react";
import Modal from "./Modal";

function Cards({ tasks, onToggleDone, onDeleteTask, onEditTask }) {
  const [editingIndex, setEditingIndex] = React.useState(null);

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one!</p>;
  }

  const openEditModal = (index) => {
    setEditingIndex(index);
    document.getElementById("modal-edit").showModal();
  };

  const closeEditModal = () => {
    setEditingIndex(null);
    document.getElementById("modal-edit").close();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {tasks.map((task, index) => {
        const isDone = task.done;

        return (
          <div
            key={index}
            className="w-full sm:w-[90%] lg:w-[75%] transition-all duration-300 cursor-pointer card bg-primary text-primary-content hover:-translate-y-2"
          >
            <div className={isDone ? "line-through text-gray-300" : ""}>
              <div className="p-4 sm:p-6 card-body">
                
                {/* Title + checkbox */}
                <h2 className="card-title">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 checkbox border-cyan-100"
                      checked={isDone}
                      onChange={() => onToggleDone(index)}
                    />
                    <span>{task.title}</span>
                  </label>
                </h2>

                <p className="text-sm sm:text-base">{task.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <p className="font-mono text-xs sm:text-sm">
                    📅 {task.date}, {task.time} <span className="font-extrabold">|</span> {task.category}
                  </p>

                  <div className="flex gap-2">
                    {/* Edit button */}
                    <button
                      className={`btn btn-circle btn-sm ${
                        isDone ? "btn-disabled opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isDone}
                      onClick={() => !isDone && openEditModal(index)}
                    >
                      <Pencil size={14} />
                    </button>

                    {/* Delete button */}
                    <button
                      className="btn btn-circle btn-sm hover:bg-red-500"
                      onClick={() => onDeleteTask(index)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Reusable modal */}
      <Modal
        id="modal-edit"
        taskTitle={editingIndex !== null ? tasks[editingIndex]?.title : ""}
        description={editingIndex !== null ? tasks[editingIndex]?.description : ""}
        date={editingIndex !== null ? tasks[editingIndex]?.date : ""}
        time={editingIndex !== null ? tasks[editingIndex]?.time : ""}
        category={editingIndex !== null ? tasks[editingIndex]?.category : ""}
        onSubmit={(updatedTask) => {
          if (editingIndex !== null) {
            onEditTask(editingIndex, updatedTask);
            setEditingIndex(null);
          }
        }}
        onClose={closeEditModal}
      />
    </div>
  );
}

export default Cards;

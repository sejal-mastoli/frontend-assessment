"use client";

import { useState } from "react";

export default function TaskItem({ task, onUpdate, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleUpdate = () => {
    if (!editedTitle.trim()) return;

    onUpdate(task.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 transition hover:border-indigo-100 hover:shadow-sm">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 cursor-pointer accent-indigo-600"
      />

      {isEditing ? (
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
            className="min-w-0 flex-1 rounded-lg border border-indigo-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={handleUpdate}
            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 break-words text-sm ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-700"
            }`}
          >
            {task.title}
          </span>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={task.completed}
              className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onUpdate,
  onToggle,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-12 text-center">
        <div className="mb-3 text-4xl">📝</div>

        <h3 className="font-semibold text-slate-700">
          No tasks found
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
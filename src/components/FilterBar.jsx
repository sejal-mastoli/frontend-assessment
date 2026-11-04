"use client";

export default function FilterBar({
  filter,
  setFilter,
  totalTasks,
  pendingTasks,
  completedTasks,
}) {
  const stats = [
    { label: "Total Tasks", count: totalTasks },
    { label: "Pending", count: pendingTasks },
    { label: "Completed", count: completedTasks },
  ];

  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="my-8">
      <div className="mb-6 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-800">
              {stat.count}
            </h3>

            <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Your Tasks
        </h2>

        <div className="flex gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${
                filter === item.value
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
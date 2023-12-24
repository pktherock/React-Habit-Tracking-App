import { NavLink } from "react-router-dom";

function AddTask() {
  return (
    <div className="flex justify-between p-3 items-center my-2 shadow border rounded font-semibold">
      <div className="space-x-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border px-3 py-1 rounded bg-orange-400"
              : "text-gray-400 hover:text-blue-300"
          }
        >
          Detail View
        </NavLink>
        <NavLink
          to="/week-view"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border px-3 py-1 rounded bg-orange-400"
              : "text-gray-400 hover:text-blue-300"
          }
        >
          Week View
        </NavLink>
      </div>
      <button
        type="button"
        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;

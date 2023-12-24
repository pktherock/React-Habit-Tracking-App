import { useState } from "react";
import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { alertService } from "../../../services";
import { addHabit } from "../slices/HabitSlice";

function AddTask() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(text.trim() && description.trim() && time.trim())) {
      return alertService.error("All fields are required!");
    }

    const taskInfo = {
      text,
      description,
      time: getFormattedTime(),
    };
    // console.log(taskInfo);

    dispatch(addHabit(taskInfo));
    setIsOpen(false);
    setText("");
    setDescription("");
    setTime("");
    alertService.success("Task added successfully!");
  };

  function getFormattedTime() {
    let result = `${time} AM`;

    const timeArr = time.split(":");
    if (Number(timeArr[0]) > 12) {
      result = `${Number(timeArr[0]) - 12}:${timeArr[1]} PM`;
    }

    return result;
  }

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
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Task
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <span
              className="float-right text-2xl cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <XMarkIcon className="w-8 h-8" />
            </span>
            <h2 className="text-xl font-bold mb-4">Dialog Title</h2>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Please enter task name"
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please enter task name"
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Please enter task name"
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;

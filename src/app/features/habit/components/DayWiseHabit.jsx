import { useDispatch, useSelector } from "react-redux";
import { Card, Container } from "../../../components";
import AddTask from "./AddTask";

import { removeHabit, toggleHabit } from "../slices/HabitSlice";
import {
  getContinuousCount,
  getHabitStatus,
  getLongestStreak,
  getCount,
  getFormattedTime,
} from "../../../utils";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { alertService } from "../../../services";

function DayWiseHabit() {
  const habits = useSelector((state) => state.habits);

  // for updating habit details
  const [habit, setHabit] = useState(null);

  const dispatch = useDispatch();

  const handleChangeCheckBox = (id) => {
    const date = new Date();
    const searchDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    dispatch(toggleHabit({ id, searchDate }));
    alertService.success(`${searchDate} Task Status updated successfully!`);
  };

  const handleEditHabit = (id) => {
    const habit = habits.find((habit) => habit.id === id);
    setHabit(habit);
  };

  return (
    <Container>
      <AddTask taskInfo={habit} setTaskInfo={setHabit} />
      <Card>
        {habits.length === 0 && (
          <h1 className="text-3xl font-semibold text-center">
            No Habits found!
          </h1>
        )}
        {habits.map(
          ({ id, count, description, habitDetails, time, text, createdAt }) => (
            <div
              key={id}
              className="flex items-center mt-2 w-full py-2 px-4 relative border-b-2"
            >
              <div className="flex justify-center items-center w-1/6">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 border checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50 w-6 h-6 cursor-pointer"
                  defaultChecked={getHabitStatus(habitDetails)}
                  onChange={() => handleChangeCheckBox(id)}
                />
              </div>

              <div className="w-5/6">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-lime-500">
                    {text} - {description}
                  </span>
                  <span>
                    Created At: {new Date(createdAt).toLocaleString()}
                  </span>
                  <span>Task Time: {getFormattedTime(time)}</span>
                </div>
                <div className="flex justify-end items-center">⭐</div>
                <div className="flex justify-between items-center">
                  <span>{getContinuousCount(habitDetails)}</span>
                  <span>{getLongestStreak(habitDetails)}</span>
                  <span>{getCount(count, createdAt)}</span>
                  <span>Daily</span>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="absolute top-[-6px] right-0">
                  <button className="text-green-500 hover:text-gray-700 mr-2">
                    <PencilIcon
                      onClick={() => handleEditHabit(id)}
                      className="h-5 w-5"
                    />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <TrashIcon
                      onClick={() => {
                        dispatch(removeHabit(id));
                        alertService.success("Task deleted successfully!");
                      }}
                      className="h-5 w-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </Card>
    </Container>
  );
}

export default DayWiseHabit;

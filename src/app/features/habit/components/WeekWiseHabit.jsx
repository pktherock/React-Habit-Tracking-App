import { useDispatch, useSelector } from "react-redux";
import { removeHabit, updateHabit } from "../slices/HabitSlice";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Card, Container } from "../../../components";

import AddTask from "./AddTask";
import DaysName from "./DaysName";
import { getHabitStatus } from "../../../utils";
import { getCount } from "../../../utils";

function WeekWiseHabit() {
  const habits = useSelector((state) => state.habits);

  const dispatch = useDispatch();

  const getAllPrevious7dates = () => {
    const result = [];
    const currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    for (let i = 0; i < 7; i++) {
      const searchDate = `${year}-${month}-${date}`;
      result.unshift(searchDate);

      currentDate.setDate(currentDate.getDate() - 1);
      date = currentDate.getDate();
      month = currentDate.getMonth() + 1;
      year = currentDate.getFullYear();
    }
    return result;
  };

  return (
    <Container>
      <AddTask />
      <DaysName />
      <Card>
        {habits.map(
          ({ id, text, description, createdAt, time, count, habitDetails }) => (
            <div key={id} className="relative">
              <div className="flex justify-between px-10 py-2 bg-gray-100 rounded font-semibold">
                <span className="text-lime-500">
                  {text} - {description}
                </span>
                <span>Created At: {new Date(createdAt).toLocaleString()}</span>
                <div className="space-x-2">
                  <span>Task Time: {time}</span>
                  <span className="text-lime-500">
                    {getCount(count, createdAt)}
                  </span>
                  <span>⭐</span>
                </div>
              </div>
              <div className="w-full flex justify-evenly p-1">
                {getAllPrevious7dates().map((date) => (
                  <div
                    key={date}
                    className="md:flex md:flex-col justify-center items-center"
                  >
                    <span>{new Date(date).getDate()} </span>
                    <div className="flex justify-center items-center w-1/6">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 border checked:bg-blue-500 checked:border-transparent focus:outline-none  w-8 h-8"
                        defaultChecked={getHabitStatus(habitDetails, date)}
                        onChange={() =>
                          dispatch(updateHabit({ id, searchDate: date }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit & Delete Buttons */}
              <div className="absolute top-[-6px] right-[-5px]">
                <button className="text-green-500 hover:text-gray-700 mr-2">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <TrashIcon
                    onClick={() => dispatch(removeHabit(id))}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          )
        )}
      </Card>
    </Container>
  );
}

export default WeekWiseHabit;

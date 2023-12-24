import { useDispatch, useSelector } from "react-redux";
import { Card, Container } from "../../../components";
import AddTask from "./AddTask";

import { updateHabit } from "../slices/HabitSlice";
import {
  getContinuousCount,
  getHabitStatus,
  getLongestStreak,
} from "../../../utils";
import getCount from "../../../utils/getCount";

function DayWiseHabit() {
  const habits = useSelector((state) => state.habits);

  const dispatch = useDispatch();

  const handleChangeCheckBox = (id) => {
    const date = new Date();
    const searchDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    dispatch(updateHabit({ id, searchDate }));
  };

  return (
    <Container>
      <AddTask />
      {habits.map(
        ({
          id,
          count,
          description,
          habitDetails,
          time,
          text,
          createdAt,
        }) => (
          <Card key={id}>
            <div className="flex items-center w-full py-2 px-4">
              <div className="flex justify-center items-center w-1/6">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 border checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-opacity-50 w-6 h-6"
                  defaultChecked={getHabitStatus(habitDetails)}
                  onChange={() => handleChangeCheckBox(id)}
                />
              </div>

              <div className="w-5/6">
                <div className="flex justify-between items-center">
                  <span>
                    {text} - {description}
                  </span>
                  <span>
                    Created At: {new Date(createdAt).toLocaleString()}
                  </span>
                  <span>Task Time: {time}</span>
                </div>
                <div className="flex justify-end items-center">⭐</div>
                <div className="flex justify-between items-center">
                  <span>{getContinuousCount(habitDetails)}</span>
                  <span>{getLongestStreak(habitDetails)}</span>
                  <span>{getCount(count, createdAt)}</span>
                  <span>Daily</span>
                </div>
              </div>
            </div>
          </Card>
        )
      )}
    </Container>
  );
}

export default DayWiseHabit;

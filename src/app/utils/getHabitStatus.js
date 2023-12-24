import { HABIT_STATUS } from "../constants";

function getHabitStatus(habitDetails = {}, date = "") {
  const currentDate = date ? new Date(date) : new Date();
  const searchDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  return habitDetails[searchDate] === HABIT_STATUS.DONE;
}

export default getHabitStatus;

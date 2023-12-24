import { HABIT_STATUS } from "../constants";

function getHabitStatus(habitDetails = {}) {
  const date = new Date();
  const searchDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return habitDetails[searchDate] === HABIT_STATUS.DONE;
}

export default getHabitStatus;

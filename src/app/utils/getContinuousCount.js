import { HABIT_STATUS } from "../constants";

function getContinuousCount(habitInfo) {
  let count = 0;
  const currentDate = new Date();
  // currentDate.setDate(currentDate.getDate() - 1); // todo
  let date = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  let isContinue = true;
  while (isContinue) {
    const searchDate = `${year}-${month}-${date}`;
    if (habitInfo[searchDate] === HABIT_STATUS.DONE) {
      count++;

      // Move to the previous day
      currentDate.setDate(currentDate.getDate() - 1);
      date = currentDate.getDate();
      month = currentDate.getMonth() + 1;
      year = currentDate.getFullYear();
    } else {
      isContinue = false;
    }
  }
  return count > 1 ? `${count} day` : `${count} days`;
}

export default getContinuousCount;

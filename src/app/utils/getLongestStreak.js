import { HABIT_STATUS } from "../constants";

function getLongestStreak(habitInfo) {
  const habitInfoCopy = { ...habitInfo };
  Object.keys(habitInfoCopy).forEach((date) => {
    if (!habitInfoCopy[date]) delete habitInfoCopy[date];
  });
  const sortedDates = Object.keys(habitInfoCopy).sort();
  if (sortedDates.length === 0) return `0 best`;

  let currentStreak = 0;
  let longestStreak = 0;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate = new Date(sortedDates[i + 1]);

    const searchDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const searchDate2 = `${nextDate.getFullYear()}-${
      nextDate.getMonth() + 1
    }-${nextDate.getDate()}`;

    if (
      habitInfo[searchDate] === HABIT_STATUS.DONE &&
      habitInfo[searchDate2] === HABIT_STATUS.DONE &&
      nextDate &&
      nextDate.getTime() - currentDate.getTime() === 86400000
    ) {
      // Dates are consecutive (difference is 1 day)
      currentStreak++;
    } else {
      // Streak is broken, update longest streak if needed
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      currentStreak = 0; // Reset streak counter for non-consecutive dates
    }
  }

  return `${longestStreak + 1} best`; // Add 1 to account for the first day of the streak
}

export default getLongestStreak;

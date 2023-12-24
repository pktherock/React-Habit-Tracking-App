import { HABIT_STATUS } from "../constants";

const getFormattedHabit = (allHabits = []) => {
  // storing allHabits so no one can temper allHabits
  let copyAllHabits = [...allHabits];

  // sort the Habits
  const sortedHabits = sortHabitOnCreatedAt(copyAllHabits);

  // format Habits
  const formattedHabits = formatHabit(sortedHabits);

  console.log("Formatted habit", formattedHabits);

  return formattedHabits;
};

function sortHabitOnCreatedAt(habits = []) {
  return habits;
}

function formatHabit(habits = []) {
  return habits.map((habit) => ({
    ...habit,
    count: getCount(habit.count, habit.createdAt),
    longestStreak: getLongestStreak(habit.habitDetails),
    continuousCount: getContinuousCount(habit.habitDetails),
    status: getHabitStatus(habit.habitDetails),
    habitDetails: getLast7DaysHabits(habit.habitDetails),
  }));
}

function getCount(count = 1, createdAt) {
  const givenDate = new Date(createdAt);
  const currentDate = new Date();

  // Calculate the end of the current day (midnight)
  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999); // Set to 23:59:59.999
  // Calculate the difference in milliseconds
  const timeDifference = endOfDay - givenDate;
  // Convert the time difference to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  return `${count}/${daysDifference}`;
}

function getLongestStreak(habitInfo) {
  const habitInfoCopy = { ...habitInfo };
  Object.keys(habitInfoCopy).forEach((date) => {
    if (!habitInfoCopy[date]) delete habitInfoCopy[date];
  });
  const sortedDates = Object.keys(habitInfoCopy).sort();
  if (sortedDates.length === 0) return `0 best`;

  let currentStreak = 0;
  let longestStreak = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const nextDate = new Date(sortedDates[i + 1]);

    if (nextDate && nextDate.getTime() - currentDate.getTime() === 86400000) {
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
    if (habitInfo[searchDate]) {
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
  return `${count} ${count === 1 ? "day" : "days"}`;
}

function getHabitStatus(habitInfo = {}) {
  const currentDate = new Date();
  const searchDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  const status = habitInfo[searchDate];

  if (status === undefined) {
    return HABIT_STATUS.NONE;
  }

  return status;
}

function getLast7DaysHabits(habitInfo = {}) {
  const currentDate = new Date();
  let date = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  for (let i = 0; i < 7; i++) {
    const searchDate = `${year}-${month}-${date}`;

    if (habitInfo[searchDate] === undefined) {
      habitInfo[searchDate] = HABIT_STATUS.NONE;
    }

    currentDate.setDate(currentDate.getDate() - 1);
    date = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
  }
  return habitInfo;
}

export default getFormattedHabit;

import { HABIT_STATUS } from "../constants";

const getFormattedHabit = (allHabits = []) => {
  // storing allHabits so no one can temper allHabits
  let copyAllHabits = [...allHabits];

  // sort the Habits
  const sortedHabits = sortHabitOnCreatedAt(copyAllHabits);

  // format Habits
  const formattedHabits = formatHabit(sortedHabits);

  // console.log("Formatted habit", formattedHabits);

  return formattedHabits;
};

function sortHabitOnCreatedAt(habits = []) {
  return habits;
}

function formatHabit(habits = []) {
  return habits.map((habit) => ({
    ...habit,
    habitDetails: getLast7DaysHabits(habit.habitDetails),
  }));
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

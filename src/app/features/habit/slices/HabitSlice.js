import { createSlice, nanoid } from "@reduxjs/toolkit";

import { getFormattedHabit } from "../../../utils";
import { HABIT_STATUS } from "../../../constants";

// Getting all stored habits from local storage
const habitsFromStorage = JSON.parse(localStorage.getItem("habits")) || [];

// This is just for demo so that at fresh start one habit will be there (you can delete or edit it whenever you want)
const demoHabit = {
  id: nanoid(),
  text: "Hello",
  description: "hello world at 3pm",
  time: "03:30",
  createdAt: "2023-12-15T02:27:59.159Z", // new Date().toISOString()
  count: 0,
  habitDetails: {},
};

// Redux store initial state
const initialState = {
  habits:
    habitsFromStorage.length > 0
      ? getFormattedHabit(habitsFromStorage)
      : getFormattedHabit([demoHabit]),
};

// Habit slice
const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    // add habit into store
    addHabit: (state, action) => {
      const { text, description, time } = action.payload;
      const habit = {
        id: nanoid(),
        text,
        description,
        time,
        createdAt: new Date().toISOString(),
        count: 0,
        habitDetails: {},
      };
      state.habits.unshift(habit);

      // set habit into local storage
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // Update habit and update store
    updateHabit: (state, action) => {
      state.habits = state.habits.map((habit) =>
        habit.id === action.payload.id ? { ...action.payload } : habit
      );

      // set habit into local storage
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // toggle habit and update into store
    toggleHabit: (state, action) => {
      state.habits = state.habits.map((habit) => {
        const { id, searchDate } = action.payload;
        // console.log(action.payload);
        if (habit.id === id) {
          const status = habit.habitDetails[searchDate];
          if (status === HABIT_STATUS.DONE) {
            habit.habitDetails[searchDate] = HABIT_STATUS.NOT_DONE;
            habit.count--;
          } else {
            habit.habitDetails[searchDate] = HABIT_STATUS.DONE;
            habit.count++;
          }
        }

        return habit;
      });

      // set habit into local storage
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // deleting habit from store
    removeHabit: (state, action) => {
      if (!confirm("Are you sure? you want to delete.")) return state;
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );

      // set habit into local storage
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
  },
});

export const { addHabit, toggleHabit, updateHabit, removeHabit } =
  habitSlice.actions;

export default habitSlice.reducer;

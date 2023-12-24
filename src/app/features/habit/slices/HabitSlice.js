import { createSlice, nanoid } from "@reduxjs/toolkit";

import { getFormattedHabit } from "../../../utils";

// Getting all stored habits from local storage
const habitsFromStorage = JSON.parse(localStorage.getItem("habits")) || [];

// This is just for demo so that at fresh start one habit will be there (you can delete or edit it whenever you want)
const demoHabit = {
  id: nanoid(),
  text: "Hello",
  description: "hello world at 3pm",
  time: "3:30 PM",
  createdAt:  "2023-12-15T02:27:59.159Z", // new Date().toISOString() 
  habitDetails: { "2023-12-20": "DONE", "2023-12-15": "DONE" }
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
    addHabit: (state, action) => {
      const habit = {
        id: nanoid(),
        text: action.payload, // todo
      };
      state.habits.unshift(habit);
    },

    updateHabit: (state, action) => {
      state.habits = state.habits.map((habit) =>
        habit.id === action.payload ? {} : habit
      );
    },

    removeHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
  },
});

export const { addHabit, updateHabit, removeHabit } = habitSlice.actions;

export default habitSlice.reducer;

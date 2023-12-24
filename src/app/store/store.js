import { configureStore } from "@reduxjs/toolkit";
import HabitReducers from "../features/habit/slices/HabitSlice";

const store = configureStore({ reducer: HabitReducers });

export default store;

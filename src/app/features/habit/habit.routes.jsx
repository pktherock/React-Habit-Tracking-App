import { DayWiseHabit, WeekWiseHabit } from "./components";

const habitRoutes = [
  {
    path: "",
    element: <DayWiseHabit />,
  },
  {
    path: "week-view",
    element: <WeekWiseHabit />,
  },
];

export default habitRoutes;

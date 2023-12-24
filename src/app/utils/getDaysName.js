export default function getDaysName() {
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDate = new Date();
  const dayNamesArray = [];

  for (let i = 0; i < 7; i++) {
    dayNamesArray.unshift(dayNames[currentDate.getDay()]);
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return dayNamesArray;
}

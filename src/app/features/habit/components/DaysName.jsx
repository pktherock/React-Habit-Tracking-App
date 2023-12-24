import { getDaysName } from "../../../utils";

function DaysName() {
  return (
    <div className="flex justify-evenly">
      {getDaysName().map((day) => (
        <span key={day} className="font-medium">
          {day}
        </span>
      ))}
    </div>
  );
}

export default DaysName;

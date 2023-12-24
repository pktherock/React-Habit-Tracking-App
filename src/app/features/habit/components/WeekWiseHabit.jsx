import { Card, Container } from "../../../components";
import AddTask from "./AddTask";
import DaysName from "./DaysName";

function WeekWiseHabit() {
  return (
    <Container>
      <AddTask />
      <DaysName />
      <Card></Card>
    </Container>
  );
}

export default WeekWiseHabit;

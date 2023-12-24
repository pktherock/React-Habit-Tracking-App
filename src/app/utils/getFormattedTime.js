function getFormattedTime(time) {
  let result = `${time} AM`;

  const timeArr = time.split(":");
  if (Number(timeArr[0]) > 12) {
    result = `${Number(timeArr[0]) - 12}:${timeArr[1]} PM`;
  }

  return result;
}

export default getFormattedTime;

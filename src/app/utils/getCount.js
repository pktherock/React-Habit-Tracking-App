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

export default getCount;

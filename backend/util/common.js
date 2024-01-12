const extractDayFromTimestamp = (dateString) => {
  const dayNumber = dateString.getDay();
  if (dayNumber === 0) {
    return "SUNDAY";
  } else if (dayNumber === 1) {
    return "MONDAY";
  } else if (dayNumber === 2) {
    return "TUESDAY";
  } else if (dayNumber === 3) {
    return "WEDNESDAY";
  } else if (dayNumber === 4) {
    return "THURSDAY";
  } else if (dayNumber === 5) {
    return "FRIDAY";
  } else {
    return "SATURDAY";
  }
};

module.exports = {
  extractDayFromTimestamp,
};

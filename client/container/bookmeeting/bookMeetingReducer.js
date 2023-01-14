const bookMeetingReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_TIME": {
      const { time } = payload;
      return {
        ...state,
        selectedTime: time,
      };
    }
    case "SET_DATE": {
      const { date } = payload;
      return {
        ...state,
        selectedDate: date,
      };
    }
    case "SET_DURATION": {
      const { duration } = payload;
      return {
        ...state,
        selectedDuration: duration,
      };
    }
    case "BOOKING_DONE": {
      return {
        ...state,
        bookingSuccess: true,
      };
    }
    default:
      return state;
  }
};

export default bookMeetingReducer;

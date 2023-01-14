import React, { useContext, useReducer } from "react";

import Header from "../../components/Header";
import StyledCalendar from "../../components/calendar/StyledCalendar";

import {
  BookMeetingStateContent,
  BookMeetingDispatchContext,
  
} from "./bookMeetingStore";

const DateSelector = () => {
  const state = useContext(BookMeetingStateContent);
  const dispatch = useContext(BookMeetingDispatchContext);

  const onDateChange = (date) => {
    dispatch({
      type: "SET_DATE",
      payload: {
        date: new Date(date),
      },
    });
  }

  return (
    <div>
      <Header
        type={3}
        message="Pick up a time"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <StyledCalendar
          onDateChange={onDateChange}
          selectedDate={state?.selectedDate}
          // tileDisabled={tileDisabled}
        />
      </div>
    </div>
  );
};

export default DateSelector;
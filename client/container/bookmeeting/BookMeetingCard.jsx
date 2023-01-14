import React, { useReducer } from "react";

import Card from "../../components/Card";
import Header from "../../components/Header";

import DateSelector from "./DateSelector";
import TimerSelector from "./TimerSelector";

import bookMeetingReducer from "./bookMeetingReducer";
import {
  BookMeetingStateContent,
  BookMeetingDispatchContext,
  bookMeetingInitialState
} from "./bookMeetingStore";

const BookMeetingCard = () => {
  const [state, dispatch] = useReducer(bookMeetingReducer, bookMeetingInitialState);

  return (
    <BookMeetingStateContent.Provider value={state}>
      <BookMeetingDispatchContext.Provider value={dispatch}>
        {state.bookingSuccess
          ? <BookingSuccessful />
          : <BookMeetingUI />
        }
      </BookMeetingDispatchContext.Provider>
    </BookMeetingStateContent.Provider>
  );
};

const BookMeetingUI = () => (
  <Card
    style={{
      display: "grid",
      columnGap: "16px",
      gridTemplateColumns: "2fr 1fr",
    }}
  >
    <div 
      style={{
        borderRight: "1px solid var(--cBorder)"
      }}
    >
      <DateSelector />
    </div>
    <div
      style={{
        paddingRight: "16px",
      }}
    >
      <TimerSelector />
    </div>
  </Card>
);

 const BookingSuccessful = () => (
  <Card
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Header
      type={3}
      message="Meeting has been successfully booked"
    />
  </Card>
 );

export default BookMeetingCard;
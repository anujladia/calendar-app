import React, { createContext } from "react";

export const BookMeetingStateContent = createContext();
export const BookMeetingDispatchContext = createContext();

export const bookMeetingInitialState = {
  selectedDate: null,
  selectedTime: null,
  selectedDuration: 30,
  bookingSuccess: false,
  allowedDurations: [
    {
      selected: true,
      value: 15,
      label: "15 mins"
    },
    {
      selected: true,
      value: 30,
      label: "30 mins"
    },
    {
      selected: false,
      value: 45,
      label: "45 mins"
    },
    {
      selected: false,
      value: 60,
      label: "1 hr"
    }
  ]
};

import React, { useState } from "react";
import Calendar from "react-calendar";
import "./calendar.scss";

const StyledCalendar = (props) => {
  const { selectedDate, onDateChange, blockedDates = [] } = props;
  
  const tileDisabled = ({ date }) => {
    return date < new Date()
 }

  return (
    <Calendar
      onChange={onDateChange}
      value={selectedDate}
      tileDisabled={tileDisabled}
    />
  );
};

export default StyledCalendar;
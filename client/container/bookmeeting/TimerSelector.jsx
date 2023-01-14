import React, { useContext, useState } from "react";
import moment from "moment/moment";

import ChooseDuration from "./ChooseDuration";
import ChooseTime from "./ChooseTime";

import Toast from "../../components/Toast";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

import { bookMeeting } from "../../api";

import {
  BookMeetingStateContent,
  BookMeetingDispatchContext
} from "./bookMeetingStore";

const TimerSelector = () => {
  const state = useContext(BookMeetingStateContent);
  const dispatch = useContext(BookMeetingDispatchContext);

  const [bookingMeeting, setBookingMeeting] = useState(false);

  const onBookMeeting = async () => {
    if (!state.selectedDate) {
      return Toast.error("Please select a date");
    }

    if (!state.selectedDuration) {
      return Toast.error("Please select a duration");
    }

    if (!state.selectedTime) {
      return Toast.error("Please select a time");
    }

    const getExactTime = `${moment(state.selectedDate).format('YYYY-MM-DD')} ${state.selectedTime}`;

    const data = {
      date: new Date(getExactTime).toISOString(),
      duration: state.selectedDuration,
    };

    setBookingMeeting(true);
    try {
      await bookMeeting(data);
      Toast.success("Meeting successfully booked");
      dispatch({
        type: "BOOKING_DONE",
      })
    } catch (err) {
      Toast.error(err.message || "Error booking the meeting");
    } finally {
      setBookingMeeting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChooseDuration />
        <ChooseTime />
      </div>

      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <Button
          primary
          // label="Book Meeting"
          onClick={onBookMeeting}
          disabled={bookingMeeting}
          style={{
            height: "40px"
          }}
        >
          {
            bookingMeeting
              ? <Loader
              size="16px"
            />
            : "Book Meeting"
          }
        </Button>
      </div>
    </div>
  );
};

export default TimerSelector;
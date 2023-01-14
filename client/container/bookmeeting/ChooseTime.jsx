import React, { useContext, useEffect, useState } from "react";
import moment from "moment/moment";
import "moment-timezone";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import PillBar from "../../components/PillBar";
import Toast from "../../components/Toast";

import {
  BookMeetingStateContent,
  BookMeetingDispatchContext
} from "./bookMeetingStore";

import { fetchFreeSlots } from "../../api";

const ChooseTime = () => {
  const state = useContext(BookMeetingStateContent);
  const dispatch = useContext(BookMeetingDispatchContext);

  const [fetchingTime, setFetchingTime] = useState(false);
  const [allowedTime, setAllowedTime] = useState([]);

  const onFetchFreeSlots = async (date) => {
    setFetchingTime(true);
    setAllowedTime(true);

    if (!date) {
      return Toast.error("Please select a date");
    }

    const data = {
      date: new Date(date).toISOString(),
      timezone: encodeURIComponent(moment.tz.guess()),
    }

    try {
      const result = await fetchFreeSlots(data);

      const _allowedTime = result.map((time, id) => ({
        id,
        value: time,
        label: time,
      }));

      setAllowedTime(_allowedTime);
    } catch (err) {
      return Toast.error(err?.message ?? "Error fetching the booking slots");
    } finally {
      setFetchingTime(false);
    }
  };

  useEffect(() => {
    if (state.selectedDate) {
      onFetchFreeSlots(state.selectedDate);
    }
  }, [state.selectedDate]);

  const onTimeChange = (timeObj) => {
    dispatch({
      type: "SET_TIME",
      payload: {
        time: timeObj?.value,
      }
    })
  };

  return (
    <div>
      <Header
        type={4}
        message="How Long?"
        align="left"
      />
      <div
        style={{
          height: "250px",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        {fetchingTime
          ? <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader
              size="24px"
            />
          </div>
          : allowedTime.length
            ? <PillBar
              data={allowedTime}
              default={state.selectedTime}
              orientation="vertical"
              onChangeSelected={onTimeChange}
            />
            : "No free slots on this day"
        }
      </div>
    </div>
  );
};

export default ChooseTime;
import React, { useContext } from "react";

import Header from "../../components/Header";
import PillBar from "../../components/PillBar";

import {
  BookMeetingDispatchContext, BookMeetingStateContent
} from "./bookMeetingStore";

const ChooseDuration = () => {
  const state = useContext(BookMeetingStateContent);
  const dispatch = useContext(BookMeetingDispatchContext);

  const onChangeDuration = (durationObj) => {
    dispatch({
      type: "SET_DURATION",
      payload: {
        duration: durationObj.value,
      }
    });
  };

  return (
    <div>
      <Header
        type={4}
        message="How Long?"
        align="left"
      />
      <PillBar
        data={state.allowedDurations ?? []}
        default={state.selectedDuration}
        orientation="horizontal"
        onChangeSelected={onChangeDuration}
      />
    </div>
  );
};

export default ChooseDuration;
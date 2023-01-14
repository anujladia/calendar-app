import React, { useContext } from "react";

import StyledPage from "../components/StyledPage";
import Header from "../components/Header";
import BookMeetingCard from "../container/bookmeeting/BookMeetingCard";

const BookMeeting = () => {
  return (
    <StyledPage>
      <Header
        message="Book a Meeting"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "32px",
        }}
      >
        <BookMeetingCard />
      </div>
    </StyledPage>
  );
}

export default BookMeeting;
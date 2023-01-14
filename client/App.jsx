import React from "react";

import BookMeeting from "./pages/BookMeeting";
import Toast from "./components/toast/Toast";

import "./theme/common.css";

const App = () => {
  return (
    <div>
      <BookMeeting />
      <Toast />
    </div>
  )
};

export default App;

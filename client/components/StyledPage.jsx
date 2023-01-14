import React from "react";

const StyledPage = (props) => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: "var(--cPageBackground)",
    }}
  >
    {props.children}
  </div>
);

export default StyledPage;
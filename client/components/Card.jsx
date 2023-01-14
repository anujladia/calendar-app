import React from "react";

const Card = ({ children, style }) => (
  <div
    style={{
      height: "500px",
      width: "700px",
      backgroundColor: "var(--cCardBackground)",
      boxShadow: "var(--cardShadows)",
      borderRadius: "4px",
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
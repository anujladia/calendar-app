import React from "react";

const SelectHeaderType = (props) => {
  let tag = "h1";
  switch (props.type) {
    case 1:
      tag = "h1"
      break;
    case 2:
      tag = "h2"
      break;
    case 3:
      tag = "h3"
      break;
    case 4:
      tag = "h3"
      break;
    case 5:
      tag = "h5"
      break;
    default:
      
  };

  return React.createElement(tag, props, [...props.children]);
};

const Header = (props) => (
  <div
    style={{
      width: "100%",
      textAlign: props?.align || "center",
      padding: "16px 0px",
      color: "var(--cPrimaryFont)"
    }}
  >
    <SelectHeaderType type={props.type}>
      {props.message}
    </SelectHeaderType>
    <h1>
    </h1>
  </div>
);

export default Header;
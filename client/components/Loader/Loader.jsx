import React from "react";
import "./loader.css";

const Loader = ({ size }) => (
  <div
    className="loader"
    style={{
      width: size,
      height: size
    }}
  ></div>
);

export default Loader;

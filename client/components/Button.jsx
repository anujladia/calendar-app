import React from "react";

const Button = (props) => {
  const {
    selected,
    primary,
    onClick,
    label,
    children,
    disabled,
    style = {},
  } = props;

  return (
    <button
      disabled={disabled}
      style={{
        width: "100%",
        padding: "8px 4px",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(selected
          ? {
            backgroundColor: "var(--cPrimary)",
            color: "#fff",
            border: "1px solid var(--cPrimary)"
          }
          : {
            backgroundColor: "var(--cLight)",
            color: "var(--cPrimaryFont)",
            border: "1px solid var(--cBorder)"
          }
        ),
        ...(primary
          ? {
            backgroundColor: "var(--cPrimaryButton)",
            color: "var(--cLight)",
            fontWeight: "bold",
            border: "1px solid var(--cPrimaryButton)",
            padding: "12px"
          }
          : {}
        ),
        ...style
      }}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      {children ?? label}
    </button>
  )
};

export default Button;
import React from "react";

const Spinner = () => {
  const spinnerStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    border: "2px solid #ccc",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  };

  return (
    <>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Spinner;

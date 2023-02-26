import React from "react";

const Button = (props) => {
  return (
    <>
      <button className="button-85" onClick={props.btnFunc}>
        {props.btnName}
      </button>
    </>
  );
};

export default Button;

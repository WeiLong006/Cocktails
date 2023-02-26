import React, { useState } from "react";
import Modal from "./Modal";
import "../App.css";

const Image = (props) => {
  const [click, setClick] = useState(false);

  const imgClick = () => {
    setClick(true);
  };

  const closeClick = () => {
    setClick(false);
  };

  return (
    <>
      <label className="imageLabel">{props.drink.strDrink}</label>
      <img
        className="displayImage"
        src={props.drink.strDrinkThumb}
        onClick={imgClick}
      ></img>
      {click && <Modal closeBtn={closeClick} drink={props.drink} />}
      {/* {console.log(props.drink)} */}
    </>
  );
};

export default Image;

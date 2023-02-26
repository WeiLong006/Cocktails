import React from "react";
import "../App.css";
import Button from "./Button";

const Modal = (props) => {
  const ingredient = [];
  const measurement = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientDefaultName = "strIngredient";
    const ingredientName = ingredientDefaultName + i;

    const measurementDefaultName = "strMeasure";
    const measurementName = measurementDefaultName + i;

    if (props.drink[ingredientName]) {
      //   console.log(props.drink[ingredientName]);
      ingredient.push(props.drink[ingredientName]);
    }

    if (props.drink[measurementName] === null) {
      measurement.push(" ");
    } else {
      measurement.push(props.drink[measurementName]);
    }
  }

  const mapIngredient = ingredient.map((ingre, id) => {
    return <div>{ingre}</div>;
  });

  const mapMeasurement = measurement.map((measure, id) => {
    return <div>{measure}</div>;
  });

  // const ingre = props.drink.map((item,id)=()=>{
  //     return (
  //         <div>

  //         </div>
  //     )
  // })
  return (
    // Open Modal
    <div id="myModal" className="modal">
      {/* Modal content */}
      <div className="modal-content">
        <label className="ingredient">{mapIngredient}</label>
        <label className="measurement">{mapMeasurement}</label>
        <img className="modalImage" src={props.drink.strDrinkThumb}></img>
        {/* {console.log(ingredient)} */}
        <Button className="modalBtn" btnName="Close" btnFunc={props.closeBtn} />
      </div>
    </div>
  );
};

export default Modal;

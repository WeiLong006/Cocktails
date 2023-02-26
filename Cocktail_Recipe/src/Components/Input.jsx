import React, { useState } from "react";
import Button from "./Button";

const Input = (props) => {
  const [userInput, setUserInput] = useState("");
  const [userSearch, setUserSearch] = useState(false);
  const defaultUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  const getInput = (event) => {
    setUserInput(event.target.value);
  };

  const search = () => {
    setUserSearch(true);
  };

  const fetchCocktail = async (url) => {
    const res = await fetch(url);
    const resData = await res.json();
    props.setResult(resData.drinks);
    setUserInput("");
  };

  if (userInput && userSearch) {
    fetchCocktail(defaultUrl + userInput);
    setUserSearch(false);
  }

  return (
    <>
      <input
      className="inputBox"
        value={userInput}
        onChange={getInput}
        placeholder="Search cocktail name"
      ></input>
      <Button btnName="Search" btnFunc={search} />
    </>
  );
};

export default Input;

import React, { useState } from "react";
import Display from "./Display";
import Input from "./Input";
import DefaultData from "./DefaultData/DefaultData";

const Home = () => {
  const [result, setResult] = useState(DefaultData.drinks);

  return (
    <>
      {/* {console.log(result)} */}
      <Input setResult={setResult} />{" "}
      {/* <Search cocktail={cocktail} setSearch={setSearch} setResult={setResult} /> */}
      <ul>
        <Display result={result} />
      </ul>
      {console.log(result)}
    </>
  );
};

export default Home;

import React, { useState } from "react";
import Image from "./Image";

const Display = (props) => {
  const displ = props.result.map((drink, id) => {
    return (
      <>
        <div className="drink">
          <li>
            <Image drink={drink} />
          </li>
        </div>
      </>
    );
  });

  return <>{displ}</>;
};

export default Display;

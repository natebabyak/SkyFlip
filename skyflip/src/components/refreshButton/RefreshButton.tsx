import React from "react";
import "./refreshButton.css";

type HandleClick = () => void;

export default function RefreshButton(handleClick: HandleClick): React.ReactNode {
  return (
    <button onClick={handleClick}>
      {<i className="material-icons">refresh</i>}
    </button>
  );
}
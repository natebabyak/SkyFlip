import React from "react";
import "./sortButton.css";

type ButtonState = "down" | "up" | "circle";

interface SortButtonProps {
  handleClick: () => void;
  text: string;
  state: ButtonState;
}

export default function SortButton({ handleClick, text, state }: SortButtonProps): React.ReactNode {
  return (
    <button onClick={handleClick}>
      {text} {state === "down" ? <i className="material-icons">arrow_drop_down</i> : state === "up" ? <i className="material-icons">arrow_drop_up</i> : <i className="material-icons">arrow_drop_down_circle</i>}
    </button>
  );
}
import { ReactNode } from "react";
import "./sortButton.css";

type SortButtonState = "down" | "up" | "down_circle";

interface SortButtonProps {
  handleClick: () => void;
  text: string;
  state: SortButtonState;
}

export default function SortButton({ handleClick, text, state }: SortButtonProps): ReactNode {
  return (
    <button onClick={handleClick}>
      {text} <i className="material-icons">arrow_drop_{state}</i>
    </button>
  );
}
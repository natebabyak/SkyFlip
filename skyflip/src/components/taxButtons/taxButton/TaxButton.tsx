import { ReactNode } from "react";
import "./taxButton.css";

type Tax = 0.01 | 0.01125 | 0.0125;

interface TaxButtonProps {
  handleClick: () => void;
  tax: Tax;
  isDisabled: boolean;
}

export default function TaxButton({ handleClick, tax, isDisabled }: TaxButtonProps): ReactNode {
  return (
    <button onClick={handleClick} disabled={isDisabled}>
      {tax * 100}%
    </button>
  );
}
import React from "react";
import "./taxButton.css";

interface TaxButtonProps {
  handleClick: () => void;
  tax: number;
  isDisabled: boolean;
}

export default function TaxButton({ handleClick, tax, isDisabled }: TaxButtonProps): React.ReactNode {
  return (
    <button onClick={handleClick} disabled={isDisabled}>
      {tax}%
    </button>
  );
}
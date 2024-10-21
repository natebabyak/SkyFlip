import { Dispatch, ReactNode, SetStateAction } from "react";
import TaxButton from "./taxButton/TaxButton.tsx";
import "./taxButtons.css";

type Tax = 0.01 | 0.01125 | 0.0125;

interface TaxButtonsProps {
  tax: Tax;
  setTax: Dispatch<SetStateAction<Tax>>;
}

export default function TaxButtons({ tax, setTax }: TaxButtonsProps): ReactNode {
  function handleClick(tax: Tax) {
    setTax(tax);
  }

  const taxValues: Tax[] = [0.01, 0.01125, 0.0125];

  return (
    <ul>
      {taxValues.map((newTax) => (
        <li key={newTax}>
          <TaxButton
            handleClick={() => handleClick(newTax)}
            tax={newTax}
            isDisabled={tax === newTax}
          />
        </li>
      ))}
    </ul>
  );
}
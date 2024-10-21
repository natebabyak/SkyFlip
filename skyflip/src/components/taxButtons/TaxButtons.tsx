import { Dispatch, ReactNode, SetStateAction } from 'react';
import './taxButtons.css';

type Tax = 0.01 | 0.01125 | 0.0125;

interface TaxButtonsProps {
  tax: Tax;
  setTax: Dispatch<SetStateAction<Tax>>;
}

export default function TaxButtons({ tax, setTax }: TaxButtonsProps): ReactNode {
  const taxValues: Tax[] = [0.01, 0.01125, 0.0125];

  return (
    <ul>
      {taxValues.map((newTax) => (
        <li key={newTax}>
          <button onClick={() => setTax(newTax)} disabled={tax === newTax}>
            {newTax * 100}%
          </button>
        </li>
      ))}
    </ul>
  );
}
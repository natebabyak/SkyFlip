import { ReactNode } from 'react';
import './copyButton.css';

interface CopyButtonProps {
  buttonText: string;
  copyText: string;
}

export default function CopyButton({ buttonText, copyText }: CopyButtonProps): ReactNode {
  return (
    <button onClick={() => navigator.clipboard.writeText(copyText)}>
      {buttonText} <i className='material-icons'>content_copy</i>
    </button>
  );
}
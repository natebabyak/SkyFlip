import React from "react";
import "./copyButton.css";

interface CopyButtonProps {
  buttonText: string;
  copyText: string;
}

export default function CopyButton({ buttonText, copyText }: CopyButtonProps): React.ReactNode {
  return (
    <button onClick={() => navigator.clipboard.writeText(copyText)}>
      <i className="material-icons">content_copy</i> {buttonText}
    </button>
  );
}
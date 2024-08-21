import { useState } from "react";

type ButtonState = "ascending" | "descending" | "neutral";

interface TableHeaderButtonProps {
  text: string;
  buttonState: ButtonState;
}


export default function TableHeader({ text, buttonState }: TableHeaderButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonState>()

  return (
    <button></button>
  )
}
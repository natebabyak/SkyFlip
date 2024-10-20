import { ReactNode } from "react";
import "./tableBody.css";

type Data = ReactNode[][];

export default function TableBody({ data }: { data: Data }): ReactNode {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
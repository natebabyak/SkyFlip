import React from "react";
import "./tableBody.css";

type Data = React.ReactNode[][];

export default function TableBody(data: Data): React.ReactNode {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {Object.values(row).map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))};
        </tr>
      ))};
    </tbody>
  );
}
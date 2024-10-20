import { ReactNode } from "react";
import "./tableHeader.css";

type Headers = ReactNode[];

export default function TableHeader({ headers }: { headers: Headers }): ReactNode {
  return (
    <thead>
      <tr>
        {headers.map((header, headerIndex) => (
          <th key={headerIndex}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}
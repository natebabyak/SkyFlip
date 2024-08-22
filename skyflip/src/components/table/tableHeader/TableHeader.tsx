import React from "react";
import "./tableHeader.css";

type Headers = React.ReactNode[];

export default function TableHeader(headers: Headers): React.ReactNode {
  return (
    <thead>
      <tr>
        {headers.map((header, headerIndex) => (
          <th key={headerIndex}>{header}</th>
        ))};
      </tr>
    </thead>
  );
}
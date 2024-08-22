import React from "react";
import TableBody from "./tableBody/TableBody.tsx";
import TableHeader from "./tableHeader/TableHeader.tsx";

interface TableProps {
  headers: React.ReactNode[];
  data: React.ReactNode[][];
}

export default function Table({ headers, data }: TableProps): React.ReactNode {
  return (
    <table>
      <TableHeader headers={headers} />
      <TableBody data={data} />
    </table>
  );
}
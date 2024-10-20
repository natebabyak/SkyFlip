import { ReactNode } from "react";
import TableBody from "./tableBody/TableBody.tsx";
import TableHeader from "./tableHeader/TableHeader.tsx";

interface TableProps {
  headers: ReactNode[];
  data: ReactNode[][];
}

export default function Table({ headers, data }: TableProps): ReactNode {
  return (
    <table>
      <TableHeader headers={headers} />
      <TableBody data={data} />
    </table>
  );
}
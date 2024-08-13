import TableHeader from "./tableHeader/TableHeader.tsx"
import TableBody from "./tableBody/TableBody.tsx"

interface TableProps {
  headers: string[]
  data: string[]
}

export default function Table({ headers, data }: TableProps) {
  return (
    <table>
      <TableHeader headers={headers} />
      <TableBody data={data} />
    </table>
  )
}
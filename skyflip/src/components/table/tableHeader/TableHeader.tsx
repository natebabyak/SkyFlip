interface TableHeaderProps {
  headers: string[];
}

export default function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {headers.map((header, headerIndex) => (
          <th key={headerIndex}>{header}</th>
        ))}
      </tr>
    </thead>
  )
}
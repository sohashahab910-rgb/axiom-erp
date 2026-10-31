import type { ReactNode } from "react";
import "./DataTable.css";

export type Column<Row> = {
  key: string;
  header: string;
  render: (row: Row) => ReactNode;
};

type DataTableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string;
  emptyMessage?: string;
};

// "Row" is a placeholder for whatever record type the screen passes in.
export function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No records found.",
}: DataTableProps<Row>) {
  if (rows.length === 0) {
    return <p className="data-table-empty">{emptyMessage}</p>;
  }

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import React from "react";

interface TableWidgetProps {
  data: any[][];
}

export const TableWidget: React.FC<TableWidgetProps> = ({ data }) => (
  <table>
    <thead>
      <tr key="header">
        {data[0].map((header, index) => (
          <th
            style={{
              width: "350px"
            }}
            key={index}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody key="body">
      {data.map((row, index) => (
        <tr key={index} style={{ height: "50px" }}>
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              style={{
                textAlign: "center"
              }}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export interface TextFieldsWidgetProps {
  fields: string[];
}

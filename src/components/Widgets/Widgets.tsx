import { FC } from "react";
import { Layout } from "../Layout";
import { TableWidget } from "./TableWidget";
import { MIN_HEIGHT, MIN_WIDTH, Widget } from "./Widget";

export const widgetList: Widget[] = [
  {
    id: "0",
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    component: <span className="text">Hola</span>
  },
  {
    id: "1",
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    component: <span className="text">2</span>
  },
  {
    id: "2",
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    component: <span className="text">3</span>
  },
  {
    id: "3",
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    component: <span className="text">4</span>
  },
  {
    id: "4",
    minHeight: MIN_HEIGHT,
    minWidth: MIN_WIDTH * 2,
    component: (
      <TableWidget
        data={[
          ["A1", "B1", "C1", "D1"],
          ["A1", "B1", "C1", "D1"],
          ["A1", "B1", "C1", "D1"]
        ]}
      />
    )
  }
];

export const renderWidgets = (layout: Layout[]) => {
  const renderComponent = (item: Layout) =>
    widgetList.find((widget) => widget.id === item.i);

  return layout.map((item) => {
    return (
      <div key={item.i}>
        <CardItem key={item.i} i={item.i}>
          {renderComponent(item)?.component}
        </CardItem>
      </div>
    );
  });
};

const CardItem: FC<{ i: string; children: React.ReactNode }> = ({
  i,
  children
}) => {
  return (
    <div
      key={i}
      style={{
        height: "100%",
        background: "#f1f1f1",
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "0.5rem"
      }}
    >
      {children}
    </div>
  );
};

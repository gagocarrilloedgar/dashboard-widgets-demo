import { FunctionComponent } from "react";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { DashboardProvider, useDashboard } from "./DashboardProvider";
import { Breakpoint, Cols, Layout, LayoutGrid, Layouts } from "./Layout";
import {
  renderWidgets,
  useAddWidget,
  widgetList
} from "./Widgets";

import "./styles.modules.css";

interface Props {
  className?: string;
  rowHeight?: number;
  cols?: Cols;
  breakpoints?: Breakpoint;
  containerPadding?: [number, number];
}

const DashboardComponent: FunctionComponent<Props> = ({
  className = "layout",
  rowHeight = 30,
  cols = { lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 },
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  containerPadding = [20, 20]
}: Props) => {
  const {
    setCurrentBreakpoint,
    setToolbox,
    toolbox,
    currentBreakpoint,
    setLayouts,
    layouts,
    editing,
    setEditing,
    mounted
  } = useDashboard();

  const { onAddItem } = useAddWidget();

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
    });
  };

  const onLayoutChange = (_layout: Layout[], layouts: Layouts) => {
    setLayouts({ ...layouts });
  };

  return (
    <>
      <section
        style={{ margin: "1rem", display: "flex", alignItems: "center" }}
      >
        <button onClick={onAddItem}>Add Item</button>
        <span style={{ marginLeft: "1rem" }}>
          <input
            type="checkbox"
            placeholder="Edit mode"
            checked={editing}
            onChange={() => setEditing(!editing)}
          />
          <span>Edit mode: {editing ? "ON" : "OFF"}</span>
        </span>
      </section>
      <LayoutGrid
        className={className}
        rowHeight={rowHeight}
        onLayoutChange={onLayoutChange}
        cols={cols}
        breakpoints={breakpoints}
        containerPadding={containerPadding}
        style={{ background: "#fff" }}
        layouts={layouts}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        preventCollision={false}
        onBreakpointChange={onBreakpointChange}
        onDrop={undefined}
        isDroppable
        isResizable={editing}
        isDraggable={editing}
      >
        {renderWidgets(layouts.lg)}
      </LayoutGrid>
    </>
  );
};

export const Dashboard = () => {
  return (
    <DashboardProvider widgetList={widgetList}>
      <DashboardComponent />
    </DashboardProvider>
  );
};

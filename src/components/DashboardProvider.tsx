import React, { FC, useEffect, useState } from "react";
import { Layouts } from "react-grid-layout";

import { Widget } from "./Widgets";

interface DashboardContextProps {
  layouts: Layouts;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  currentBreakpoint: string;
  setCurrentBreakpoint: React.Dispatch<React.SetStateAction<string>>;
  mounted: boolean;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  toolbox: { [index: string]: any[] };
  setToolbox: React.Dispatch<
    React.SetStateAction<{
      [index: string]: any[];
    }>
  >;
  setLayouts: React.Dispatch<React.SetStateAction<Layouts>>;
}
const DashboardContext = React.createContext<DashboardContextProps | null>(
  null
);

export const DashboardProvider: FC<{
  children: React.ReactNode;
  widgetList: Widget[];
}> = ({ children, widgetList }) => {
  const [layouts, setLayouts] = React.useState<Layouts>({
    lg: []
  });

  const [editing, setEditing] = useState<boolean>(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [mounted, setMounted] = useState(false);
  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: []
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedLayout = localStorage.getItem("dashboardLayout");

    const layoutToSet = storedLayout
      ? JSON.parse(storedLayout)
      : generateLayoutFromWidgets(widgetList);
    setLayouts(layoutToSet);
  }, []);

  useEffect(() => {
    if (layouts.lg.length > 0) storeLayoutInLocalStorage(layouts);
  }, [layouts]);

  return (
    <DashboardContext.Provider
      value={{
        layouts,
        setLayouts,
        editing,
        setEditing,
        currentBreakpoint,
        setCurrentBreakpoint,
        mounted,
        setMounted,
        toolbox,
        setToolbox
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = React.useContext(DashboardContext);

  if (context === null) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

const generateLayoutFromWidgets = (widgets: Widget[]): Layouts => {
  return {
    lg: widgets.map((widget, i) => {
      // Compute x and y positions based on the last element
      const x = i === 0 ? 0 : i % 3;
      const y = i === 0 ? 0 : Math.floor(i / 3);

      return {
        x,
        y,
        w: widget.minWidth,
        h: widget.minHeight,
        i: widget.id,
        minH: widget.minHeight,
        maxH: widget.minHeight * 2
      };
    })
  };
};

const storeLayoutInLocalStorage = (layouts: Layouts) => {
  localStorage.setItem("dashboardLayout", JSON.stringify(layouts));
};

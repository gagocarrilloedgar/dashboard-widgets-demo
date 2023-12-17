import { Responsive, WidthProvider } from "react-grid-layout";

export const LayoutGrid = WidthProvider(Responsive);

export interface Layouts extends ReactGridLayout.Layouts {}
export interface Layout extends ReactGridLayout.Layout {}

export interface Breakpoint {
  [index: string]: number;
}

export interface Cols {
  [index: string]: number;
}

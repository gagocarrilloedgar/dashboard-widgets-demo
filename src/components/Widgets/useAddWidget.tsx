import { MAX_HEIGHT, MIN_HEIGHT, MIN_WIDTH } from ".";
import { useDashboard } from "../DashboardProvider";
import { Layouts } from "../Layout";

export const useAddWidget = () => {
  const { layouts, setLayouts } = useDashboard();

  const onAddItem = () => {
    const newItem = createItem(layouts);

    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: [...prevLayouts.lg, newItem]
    }));
  };

  return {
    onAddItem
  };
};

const createItem = (layouts: Layouts) => {
  const lastAvailableIndex = layouts.lg.reduce(
    (maxIndex, item) =>
      parseInt(item.i) > maxIndex ? parseInt(item.i) : maxIndex,
    -1
  );

  const firstAvailablePosition = layouts.lg.reduce(
    (maxIndex, item) => (item.y > maxIndex ? item.y : maxIndex),
    -1
  );

  return {
    x: 0,
    y: firstAvailablePosition,
    w: MIN_WIDTH,
    h: MIN_HEIGHT,
    i: (lastAvailableIndex + 1).toString(),
    minH: MIN_HEIGHT,
    maxH: MAX_HEIGHT
  };
};

export const useRemoveWidget = () => {
  const { setLayouts } = useDashboard();

  const onRemoveItem = (i: string) => {
    setLayouts((prevLayouts) => ({
      ...prevLayouts,
      lg: prevLayouts.lg.filter((item) => item.i !== i)
    }));
  };

  return {
    onRemoveItem
  };
};

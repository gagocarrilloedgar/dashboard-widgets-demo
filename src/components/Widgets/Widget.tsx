export interface Widget {
  id: string;
  minHeight: number;
  minWidth: number;
  component: React.ReactNode;
}

const MIN_HEIGHT = 10;
const MAX_HEIGHT = MIN_HEIGHT * 2;
const MIN_WIDTH = 1;

export { MAX_HEIGHT, MIN_HEIGHT, MIN_WIDTH };


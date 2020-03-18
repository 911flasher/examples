export const tableWidth = 400;

const scrollRenderer = (scrollLeft) => {
  const center = Math.round(scrollLeft / tableWidth);
  const centerMinus5 = center - 5;
  const start = centerMinus5 < 0 ? 0 : centerMinus5;
  const end = start + 10;

  return { start, end, scrollLeft };
};

export default scrollRenderer;

export const createURL = (svg: string): string => {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

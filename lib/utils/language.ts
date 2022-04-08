export const isHangul = (str: string): boolean => {
  return (
    !(
      (str.match(/[!@#$%^&*(),.?":{}|<>]+/) ||
        str.match(/[a-z]+/) ||
        str.match(/[A-Z]+/) ||
        str.match(/\d+/)) &&
      str !== ''
    ) ?? false
  );
};

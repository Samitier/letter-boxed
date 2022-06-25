export enum Side {
  left = "left",
  right = "right",
  top = "top",
  bottom = "bottom",
}

export function getSideFromIndex(index: number) {
  switch (index) {
    case 0:
      return Side.top;
    case 1:
      return Side.right;
    case 2:
      return Side.bottom;
    default:
      return Side.left;
  }
}

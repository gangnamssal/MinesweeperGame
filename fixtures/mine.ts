const mine = {
  mine: Array.from(Array(8), () => Array(8).fill(0)),
  isStart: false,
  row: 8,
  col: 8,
  stack: [],
  visited: Array.from(Array(8), () => Array(8).fill(0)),
  isFindMine: false,
  isDone: false,
};

export default mine;

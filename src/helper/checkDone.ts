export default function checkDone(mine: number[][]) {
  let isDone = true;

  for (const row of mine) {
    for (const col of row) {
      if (!col) isDone = false;
    }
  }

  return isDone;
}

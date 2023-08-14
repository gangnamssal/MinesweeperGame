import { describe, it } from 'vitest';

import mine from '@fixtures/mine';
import reducer, {
  changeDifficulty,
  changeMine,
  findMine,
  resetMine,
  setCustomMap,
  setIsDone,
  stackPush,
  visitedPush,
} from '@store/mineSlice/mineSlice';

const context = describe;

describe('mineSlice', () => {
  context('changeDifficulty', () => {
    it('is changing difficulty', () => {
      const originState = reducer(mine, changeDifficulty({ row: 10, col: 10 }));

      const changeState = reducer(mine, changeDifficulty({ row: 20, col: 20 }));

      expect(originState).not.toEqual(changeState);
    });
  });

  context('changeMine', () => {
    it('is changing mine map', () => {
      const newMineMap = [
        [-1, -1, -1, 10],
        [10, 10, -1, -1],
        [10, 10, -1, 10],
      ];

      const state = reducer(mine, changeMine(newMineMap));

      expect(mine.mine).not.toEqual(state.mine);
    });
  });

  context('stackPush', () => {
    it('is push stack', () => {
      const stackItem = [[1, 2]];

      const state = reducer(mine, stackPush(stackItem));

      expect(state.stack).toHaveLength(1);
    });
  });

  context('visitedPush', () => {
    it('is push visited', () => {
      const visitedItem = [[1, 2]];

      const state = reducer(mine, visitedPush(visitedItem));

      expect(state.visited).toHaveLength(1);
    });
  });

  context('findMine', () => {
    it('is find mine', () => {
      const state = reducer(mine, findMine());

      expect(state.isFindMine).toBeTruthy();
    });
  });

  context('resetMine', () => {
    it('is reset mine map', () => {
      const originState = {
        mine: [
          [1, 2, 1],
          [10, 1, 2],
          [2, 2, 2],
        ],
        isStart: true,
        row: 10,
        col: 10,
        stack: [
          [1, 1],
          [1, 2],
        ],
        visited: [
          [1, 1],
          [1, 2],
          [4, 5],
        ],
        isFindMine: true,
        isDone: true,
      };

      const state = reducer(originState, resetMine({ row: 8, col: 8 }));

      expect(state).toEqual(mine);
    });
  });

  context('setIsDone', () => {
    it('is success game', () => {
      const state = reducer(mine, setIsDone());

      expect(state.isDone).toBeTruthy();
    });
  });

  context('setCustomMap', () => {
    it('custom mine map', () => {
      const state = reducer(mine, setCustomMap({ row: 20, col: 20 }));

      expect(state.row).toBe(20);
      expect(state.col).toBe(20);
      expect(state.mine).toHaveLength(20);
      expect(state.mine[0]).toHaveLength(20);
    });
  });
});

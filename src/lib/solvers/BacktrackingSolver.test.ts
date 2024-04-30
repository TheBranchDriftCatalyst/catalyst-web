import BacktrackingSolver from './BacktrackingSolver';

describe('BacktrackingSolver', () => {
  test('initializes correctly', () => {
    const solver = new BacktrackingSolver(4);
    expect(solver).toBeDefined();
    expect(solver.stats).toEqual({
      steps: 0,
      removed: 0,
      placed: 0,
      solved: 0
    });
  });

  test('solves the 4-queens problem correctly', () => {
    const solver = new BacktrackingSolver(4);
    solver.solve();
    expect(solver.solutions.length).toBeGreaterThan(0);
    solver.solutions.forEach(solution => {
      expect(solution.length).toBe(4); // Ensure each solution has 4 queens
      // Check that no two queens threaten each other
      solution.forEach(([x1, y1], index1) => {
        solution.forEach(([x2, y2], index2) => {
          if (index1 !== index2) {
            expect(x1).not.toBe(x2); // Different rows
            expect(y1).not.toBe(y2); // Different columns
            expect(Math.abs(x1 - x2)).not.toBe(Math.abs(y1 - y2)); // Different diagonals
          }
        });
      });
    });
  });

  test('no solutions exist for n=2 and n=3', () => {
    const solver2 = new BacktrackingSolver(2);
    const solver3 = new BacktrackingSolver(3);
    solver2.solve();
    solver3.solve();
    expect(solver2.solutions.length).toBe(0);
    expect(solver3.solutions.length).toBe(0);
  });

  test('onMove callback is called', () => {
    const mockCallback = jest.fn();
    const solver = new BacktrackingSolver(4);
    solver._bindOnMove(mockCallback);
    solver.solve();
    expect(mockCallback).toHaveBeenCalled();
  });

  test('output solution boards are correctly formatted', () => {
    const solver = new BacktrackingSolver(4);
    solver.solve();
    const boards = solver.getSolutionBoards();
    expect(boards.length).toBeGreaterThan(0);
    boards.forEach(board => {
      expect(board.split('\n').length).toBe(4); // Each board should have 4 rows
      expect(board).toMatch(/Q/); // Each board should contain at least one queen
    });
  });
});

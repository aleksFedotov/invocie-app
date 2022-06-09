import createId from '../generateId';

describe('generateId testing', () => {
  test('should retrun CC0000', () => {
    const spy = jest.spyOn(global.Math, 'random');
    spy.mockReturnValue(0.1);
    expect(createId()).toEqual('CC0000');
  });
});

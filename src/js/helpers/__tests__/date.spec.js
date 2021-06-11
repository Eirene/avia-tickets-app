import { formatDate } from '../date';

describe('formatDate', () => {
  it('check format', () => {
    expect(formatDate(1577014368252, 'yyyy')).toBe('2019');
  });
});

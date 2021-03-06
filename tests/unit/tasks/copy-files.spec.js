
describe('copy files', () => {
  let log;
  let mockLog;

  beforeEach(() => {
    log = console.log;
    mockLog = jest.fn();

    console.log = mockLog;

    jest.mock('fs-extra', () => ({
      copy: (src, destination) => new Promise((res, rej) => {
        res();
      }),
    }));
  });

  it('should copy files', () => {
    expect.assertions(1);

    const copyFiles = require('../../../lib/tasks/copy-files');

    return copyFiles('test', 'dest')()
      .then((msg) => {
        expect(msg).toEqual(expect.stringContaining('test -> dest'));
      });
  });

  it('should log a message about the copied files', () => {
    expect.assertions(2);

    const copyFiles = require('../../../lib/tasks/copy-files');
    
    return copyFiles('test', 'dest')()
      .then((msg) => {
        expect(mockLog.mock.calls.length).toBe(1);
        expect(mockLog.mock.calls[0][0]).toEqual(
          expect.stringMatching('Copied data to dest.')
        );
      });
  });

  afterEach(() => {
    console.log = log;
    jest.resetAllMocks();
  })
});

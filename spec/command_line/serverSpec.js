const ServerModule = require('../../src/command_line/server');
const DispatcherModule = require('../../src/command_line/dispatcher');

describe('Server', () => {
  beforeEach(() => {
    this.server = new ServerModule.Server();
  });

  it('#constructor should init this.dispatcher', () => {
    expect(this.server.dispatcher).toEqual(jasmine.any(DispatcherModule.Dispatcher));
  });

  it('#start should, by default, send request to homeController#root page', () => {
    spyOn(this.server.dispatcher, 'dispatch');

    this.server.start();

    expect(this.server.dispatcher.dispatch).toHaveBeenCalledWith({route: '/', parameters: {}});
  });
});

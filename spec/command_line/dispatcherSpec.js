const DispatcherModule = require('../../src/command_line/dispatcher');

describe('Dispatcher', () => {
  beforeEach(() => {
    const routes = {
      '/': 'homeController#root',
      '/home': 'homeController#index',
      '1': 'studentsController#new',
      '/students': 'studentsController#create',
      '2': 'studentsController#index',
    };
    this.dispatcher = new DispatcherModule.Dispatcher(routes);
  });

  it('#constructor should init this.controllers', () => {
    expect(this.dispatcher.controllers).toBeDefined();
  });

  it('#dispatch should dispatch request to the corresponding controller action', () => {
    let params = {};
    spyOn(this.dispatcher.controllers.homeController, 'root');

    this.dispatcher.dispatch({route: '/', parameters: params});

    expect(this.dispatcher.controllers.homeController.root).toHaveBeenCalledWith(params);
  });
});

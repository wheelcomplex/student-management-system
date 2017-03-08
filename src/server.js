const DispatcherModule = require('./dispatcher');

class Server {
  constructor(){
    var routes = {
      '/': 'homeController#root',
      '/home': 'homeController#index',
      '1': 'studentsController#newStudent',
      '2': 'studentsController#index',
      '3': 'homeController#exit'
    };
    this.dispatcher = new DispatcherModule.Dispatcher(routes);
    this.studentsDB = [];
  }

  start(){
    this.dispatcher.dispatch({route: '/', parameters: {}});
  }
}

module.exports.Server = Server;

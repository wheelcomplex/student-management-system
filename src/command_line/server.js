const DispatcherModule = require('./dispatcher');

class Server {
  constructor(){
    var routes = {
      '/': 'homeController#root',
      '/home': 'homeController#index',
      '3': 'homeController#exit',
      '1': 'studentsController#newStudent',
      '/students/create': 'studentsController#create',
      '2': 'studentsController#query',
      '/students': 'studentsController#index',
    };
    this.dispatcher = new DispatcherModule.Dispatcher(routes, this);
  }

  start(){
    this.dispatcher.dispatch({route: '/', parameters: {}});
  }
}

module.exports.Server = Server;

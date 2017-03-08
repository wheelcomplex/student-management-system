const HomeControllerModule = require('./homeController');
const StudentsControllerModule = require('./studentsController');

class Dispatcher {
  constructor(routes, server){
    this.controllers = {
      homeController: new HomeControllerModule.HomeController(this),
      studnentController: new StudentsControllerModule.StudentsController(this)
    };
    this.routes = routes;
    this.server = server;
  }

  dispatch(request){
    var controllerName, actionName;
    [controllerName, actionName] = this.routes[request.route].split('#');
    this.controllers[controllerName][actionName](request.parameters);
  }
}

module.exports.Dispatcher = Dispatcher;

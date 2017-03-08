const ServerModule = require('./server');

class App {
  constructor() {
  }

  start(){
    var server = new ServerModule.Server();
    server.start();
  }
}

var myApp = new App();
myApp.start();

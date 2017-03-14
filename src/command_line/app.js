const ServerModule = require('./server');

class App {
  constructor() {
  }

  start(){
    let server = new ServerModule.Server();
    server.start();
  }
}

let myApp = new App();
myApp.start();

module.exports.App = App;
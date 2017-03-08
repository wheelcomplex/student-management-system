const rlModule = require('./io');

class HomeController {
  constructor(dispatcher){
    this.dispatcher = dispatcher;
  }

  root(parameters){
    var response = `1. 添加学生
2. 生成成绩单
请输入你的选择（1～2）：
`;
    rlModule.rl.question(response, (routeName) => {
      if (this.validateInputForRootPage(routeName)) {
        this.dispatcher.dispatch({
          route: routeName,
          parameters: {}
        });
      } else {
        this.dispatcher.dispatch({
          route: '/',
          parameters: {}
        });
      }
    });
  }

  index(parameters){
    var response = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
`;
    rlModule.rl.question(response, (routeName) => {
      if (this.validateInputForIndexPage(routeName)) {
        this.dispatcher.dispatch({
          route: routeName,
          parameters: {}
        });
      } else {
        this.dispatcher.dispatch({
          route: '/home',
          parameters: {}
        });
      }
    });
  }

  exit(parameters){
    process.exit();
  }

  validateInputForRootPage(routeName) {
    return /^[12]$/.test(routeName);
  }

  validateInputForIndexPage(routeName) {
    return /^[123]$/.test(routeName);
  }
}

module.exports.HomeController = HomeController;

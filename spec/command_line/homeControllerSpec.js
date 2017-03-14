const HomeControllerModule = require('../../src/command_line/homeController');
const rlModule = require('../../src/command_line/io');

describe('HomeController', () => {
  beforeEach(() => {
    var dispatcher = {
      dispatch: () => {}
    };
    this.homeController = new HomeControllerModule.HomeController(dispatcher);
  });

  it('#root should render the right response for the root page', () => {
    var expectedResponse = `1. 添加学生
2. 生成成绩单
请输入你的选择（1～2）：
`;

    spyOn(rlModule.rl, 'question');

    this.homeController.root({});

    expect(rlModule.rl.question).toHaveBeenCalledWith(expectedResponse, jasmine.any(Function));
  });

  it('#root should dispatch a request to the corresponding page when user input is valid', () => {
    var routeName = 'valid route name';

    spyOn(this.homeController, 'validateInputForRootPage').and.callFake(() => {
      return true;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback(routeName);
    });

    spyOn(this.homeController.dispatcher, 'dispatch');

    this.homeController.root({});

    expect(this.homeController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: routeName,
      parameters: {}
    });
  });

  it('#root should dispatch a request to the root page when user input is invalid', () => {
    spyOn(this.homeController, 'validateInputForRootPage').and.callFake(() => {
      return false;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback('invalid route name');
    });

    spyOn(this.homeController.dispatcher, 'dispatch');

    this.homeController.root({});

    expect(this.homeController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '/',
      parameters: {}
    });
  });

  it('#index should render the right response for the index page', () => {
    var expectedResponse = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
`;

    spyOn(rlModule.rl, 'question');

    this.homeController.index({});

    expect(rlModule.rl.question).toHaveBeenCalledWith(expectedResponse, jasmine.any(Function));
  });

  it('#index should dispatch a request to the corresponding page when user input is valid', () => {
    var routeName = 'valid route name';

    spyOn(this.homeController, 'validateInputForIndexPage').and.callFake(() => {
      return true;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback(routeName);
    });

    spyOn(this.homeController.dispatcher, 'dispatch');

    this.homeController.index({});

    expect(this.homeController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: routeName,
      parameters: {}
    });
  });

  it('#index should dispatch a request to the index page when user input is invalid', () => {
    spyOn(this.homeController, 'validateInputForIndexPage').and.callFake(() => {
      return false;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback('invalid route name');
    });

    spyOn(this.homeController.dispatcher, 'dispatch');

    this.homeController.index({});

    expect(this.homeController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '/home',
      parameters: {}
    });
  });
});

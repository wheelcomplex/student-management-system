const StudentsControllerModule = require('../../src/command_line/studentsController');
const StudentModule = require('../../lib/student');
const rlModule = require('../../src/command_line/io');

describe('StudentsController', () => {
  beforeEach(() => {
    const dispatcher = {
      dispatch: () => {
      }
    };
    this.studentsController = new StudentsControllerModule.StudentsController(dispatcher);
  });

  it('#newStudent should render the right response for the newStudent page', () => {
    const expectedResponse = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：
`;

    spyOn(rlModule.rl, 'question');

    this.studentsController.newStudent({});

    expect(rlModule.rl.question).toHaveBeenCalledWith(expectedResponse, jasmine.any(Function));
  });

  it('#newStudent should dispatch a request to the corresponding page when user input is valid', () => {
    const studentString = {};

    spyOn(StudentModule.Student, 'validateStudentString').and.callFake(() => {
      return true;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback(studentString);
    });

    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.newStudent({});

    expect(this.studentsController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '/students/create',
      parameters: studentString
    });
  });

  it('#newStudent should dispatch a request to the newStudent page when user input is invalid', () => {
    const studentString = {};

    spyOn(StudentModule.Student, 'validateStudentString').and.callFake(() => {
      return false;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback(studentString);
    });

    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.newStudent({});

    expect(this.studentsController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '1',
      parameters: {displayErrorMessage: true}
    });
  });

  it('#create should render the right response', () => {
    const studentName = 'Mike';
    const student = {
      name: studentName,
      save: () => {}
    };
    const expectedResponse = `学生${studentName}的成绩被添加
`;
    spyOn(console, 'log');
    spyOn(StudentModule.Student, 'initStudentFromString').and.callFake(() => {
      return student;
    });
    spyOn(student, 'save');
    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.create({});

    expect(console.log).toHaveBeenCalledWith(expectedResponse);
  });

  it('#create should persist the student', () => {
    const student = {
      save: () => {}
    };

    spyOn(console, 'log');
    spyOn(StudentModule.Student, 'initStudentFromString').and.callFake(() => {
      return student;
    });
    spyOn(student, 'save');
    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.create({});

    expect(student.save).toHaveBeenCalled();
  });

  it('#create should dispatch a request to the home index page', () => {
    const student = {
      save: () => {}
    };

    spyOn(console, 'log');
    spyOn(StudentModule.Student, 'initStudentFromString').and.callFake(() => {
      return student;
    });
    spyOn(student, 'save');
    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.create({});

    expect(this.studentsController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '/home',
      parameters: {}
    });
  });

  it('#query should render the right response for the query page', () => {
    const expectedResponse = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
`;

    spyOn(rlModule.rl, 'question');

    this.studentsController.query({});

    expect(rlModule.rl.question).toHaveBeenCalledWith(expectedResponse, jasmine.any(Function));
  });

  it('#query should dispatch a request to the corresponding page when user input is valid', () => {
    const studentString = {};

    spyOn(StudentModule.Student, 'validateQueryString').and.callFake(() => {
      return true;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback(studentString);
    });

    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.query({});

    expect(this.studentsController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '/students',
      parameters: studentString
    });
  });

  it('#query should dispatch a request to the query page when user input is invalid', () => {
    const studentString = {};

    spyOn(StudentModule.Student, 'validateQueryString').and.callFake(() => {
      return false;
    });

    spyOn(rlModule.rl, 'question').and.callFake((response, callback) => {
      callback(studentString);
    });

    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.query({});

    expect(this.studentsController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '2',
      parameters: {displayErrorMessage: true}
    });
  });

  it('#index should render the right response', () => {
    const students = [
      StudentModule.Student.initStudentFromString('张三, 13, 满, 软件二班, 语文: 100, 数学: 30, 英语: 90, 编程: 60'),
      StudentModule.Student.initStudentFromString('李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 90')
    ];
    const expectedResponse = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
张三|30|100|90|60|70|280
李四|90|80|70|90|82.5|330
========================
全班总分平均数：305
全班总分中位数：280`;

    spyOn(console, 'log');
    spyOn(StudentModule.Student, 'query').and.callFake(() => {
      return students;
    });
    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.index({});

    expect(console.log).toHaveBeenCalledWith(expectedResponse);
  });

  it('#index should dispatch a request to the home index page', () => {
    spyOn(console, 'log');
    spyOn(StudentModule.Student, 'query').and.callFake(() => {
      return [];
    });
    spyOn(this.studentsController.dispatcher, 'dispatch');

    this.studentsController.index({});

    expect(this.studentsController.dispatcher.dispatch).toHaveBeenCalledWith({
      route: '/home',
      parameters: {}
    });
  });
});

const rlModule = require('./io');
const StudentModule = require('./student');

class StudentsController {
  constructor(dispatcher){
    this.dispatcher = dispatcher;
  }

  newStudent(parameters){
    var normalResponse = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：
`;
    var errorResponse = `
请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：
`;
    var response = parameters.displayErrorMessage ? errorResponse : normalResponse;

    rlModule.rl.question(response, (studentString) => {
      if (StudentModule.Student.validateStudentString(studentString)) {
        this.dispatcher.dispatch({
          route: '/students/create',
          parameters: studentString
        });
      } else {
        this.dispatcher.dispatch({
          route: '1',
          parameters: {displayErrorMessage: true}
        });
      }
    });
  }

  create(parameters){
    var student = new StudentModule.Student(parameters);
    this.dispatcher.server.studentsDB.push(student);

    var response = `学生{student.name}的成绩被添加
`;
    console.log(response);

    this.dispatcher.dispatch({
      route: '/home',
      parameters: {}
    });
  }

query(parameters){
    var normalResponse = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
`;
    var errorResponse = `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
`;
    var response = parameters.displayErrorMessage ? errorResponse : normalResponse;

    rlModule.rl.question(response, (queryString) => {
      if (StudentModule.Student.validateQueryString(queryString)) {
        this.dispatcher.dispatch({
          route: '/students',
          parameters: queryString
        });
      } else {
        this.dispatcher.dispatch({
          route: '2',
          parameters: {displayErrorMessage: true}
        });
      }
    });
  }

  index(parameters){
    var students = StudentModule.Student.query(parameters, this.dispatcher.server.studentsDB);

    var response = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
{students[0].name}|75|95|80|80|82.5|330
李四|85|80|70|90|81.25|325
========================
全班总分平均数：xxx
全班总分中位数：xxx`;

    console.log(response);

    this.dispatcher.dispatch({
      route: '/home',
      parameters: {}
    });
  }
}

module.exports.StudentsController = StudentsController;

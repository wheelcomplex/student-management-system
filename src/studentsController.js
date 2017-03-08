class StudentsController {
  constructor(dispatcher){
    this.dispatcher = dispatcher;
  }

  newStudent(parameters){
    var normalResponse = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`;
    var errorResponse = `请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：`;
    var response = parameters.displayErrorMessage ? errorResponse : normalResponse;

    rl.question(response, (studentData) => {
      rl.close();

      if (this.validateInputForNewStudentPage(routeName)) {
        this.dispatcher.dispatch({
          route: '/students',
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
    var student = new Student(parameters.studentString);
    this.dispatcher.server.studentsDB.push(student);

    var response = `学生{student.name}的成绩被添加\n`;
    console.log(response);

    this.dispatcher.dispatch({
      route: '/home',
      parameters: {}
    });
  }
}

module.exports.StudentsController = StudentsController;

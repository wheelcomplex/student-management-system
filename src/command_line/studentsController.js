const rlModule = require('./io');
const StudentModule = require('./../../lib/student');
const RoundAtMost1DecimalModule = require('./../../lib/roundAtMost1Decimal');

class StudentsController {
  constructor(dispatcher){
    this.dispatcher = dispatcher;
  }

  newStudent(parameters){
    const normalResponse = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：
`;
    const errorResponse = `
请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：
`;
    const response = parameters.displayErrorMessage ? errorResponse : normalResponse;

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
    let student = StudentModule.Student.initStudentFromString(parameters);
    student.save();

    const response = `学生${student.name}的成绩被添加
`;
    console.log(response);

    this.dispatcher.dispatch({
      route: '/home',
      parameters: {}
    });
  }

  query(parameters){
    const normalResponse = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
`;
    const errorResponse = `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：
`;
    const response = parameters.displayErrorMessage ? errorResponse : normalResponse;

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
    let students = StudentModule.Student.query(parameters);

    const response = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
${students.map((student) => {
      return `${student.name}|${student.mathScore}|${student.mandarinScore}|${student.englishScore}|${student.programmingScore}|${RoundAtMost1DecimalModule.roundAtMost1Decimal(student.averageScore())}|${RoundAtMost1DecimalModule.roundAtMost1Decimal(student.totalScore())}`;
    }).join(`
`)}
========================
全班总分平均数：${RoundAtMost1DecimalModule.roundAtMost1Decimal(StudentModule.Student.averageOfTotalScoreSum(students))}
全班总分中位数：${RoundAtMost1DecimalModule.roundAtMost1Decimal(StudentModule.Student.medianOfTotalScoreSum(students))}`;

    console.log(response);

    this.dispatcher.dispatch({
      route: '/home',
      parameters: {}
    });
  }
}

module.exports.StudentsController = StudentsController;

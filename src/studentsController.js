const rlModule = require('./io');
const StudentModule = require('./student');

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
    this.dispatcher.server.studentsDB.push(student);

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
    let students = this.dispatcher.server.studentsDB.filter((student) => {
      return parameters.split(', ').includes(student.studentNum);
    });

    const averageOfTotalScoreSum = students.map((student) => {
      return student.totalScore();
    }).reduce((totalScoreSum, totalScore) => {
      return totalScoreSum + totalScore;
    }, 0) / students.length;

    const medianOfTotalScoreSum = students.map((student) => {
      return student.totalScore();
    }).sort()[Math.round(students.length / 2) - 1];

    const response = `成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
${students.map((student) => {
      return `${student.name}|${student.mathScore}|${student.mandarinScore}|${student.englishScore}|${student.programmingScore}|${student.averageScore().toFixed(1)}|${student.totalScore().toFixed(0)}`;
    })}
========================
全班总分平均数：${averageOfTotalScoreSum}
全班总分中位数：${medianOfTotalScoreSum}`;

    console.log(response);

    this.dispatcher.dispatch({
      route: '/home',
      parameters: {}
    });
  }
}

module.exports.StudentsController = StudentsController;

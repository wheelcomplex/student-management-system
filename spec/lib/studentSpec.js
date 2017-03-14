const StudentModule = require('../../lib/student');

describe('Student', () => {
  it('.validateStudentString should validate student string', () => {
    const studentString = '李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 70';

    expect(StudentModule.Student.validateStudentString(studentString)).toEqual(true);
  });

  it('#parseStudentFromString should parse student from string', () => {
    const studentString = '李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 70';

    expect(StudentModule.Student.initStudentFromString(studentString)).toEqual(jasmine.any(StudentModule.Student));
  });

  it('.validateQueryString should validate query string', () => {
    const queryString = '03, 02, 01, 80, 70';

    expect(StudentModule.Student.validateQueryString(queryString)).toEqual(true);
  });

  it('#averageScore should calculate average score', () => {
    let student = StudentModule.Student.initStudentFromString('李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 70');

    expect(student.averageScore()).toEqual(77.5);
  });

  it('#totalScore should calculate total score', () => {
    let student = StudentModule.Student.initStudentFromString('李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 70');

    expect(student.totalScore()).toEqual(310);
  });

  it('.averageOfTotalScoreSum should calculate the average of the sum of the total score of selected students', () => {
    const students = [
      StudentModule.Student.initStudentFromString('张三, 13, 满, 软件二班, 语文: 100, 数学: 30, 英语: 90, 编程: 60'),
      StudentModule.Student.initStudentFromString('李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 90')
    ];
    const expectedAverageOfTotalScoreSum = 305;

    expect(StudentModule.Student.averageOfTotalScoreSum(students)).toEqual(expectedAverageOfTotalScoreSum);
  });

  it('.medianOfTotalScoreSum should return the median of the sum of the total score of selected students', () => {
    const students = [
      StudentModule.Student.initStudentFromString('张三, 13, 满, 软件二班, 语文: 100, 数学: 30, 英语: 90, 编程: 60'),
      StudentModule.Student.initStudentFromString('李四, 02, 汉, 计算机一班, 语文: 80, 数学: 90, 英语: 70, 编程: 90'),
      StudentModule.Student.initStudentFromString('李四, 02, 汉, 计算机一班, 语文: 1, 数学: 1, 英语: 0, 编程: 1')
    ];
    const expectedMedianOfTotalScoreSum = 280;

    expect(StudentModule.Student.medianOfTotalScoreSum(students)).toEqual(expectedMedianOfTotalScoreSum);
  });
});

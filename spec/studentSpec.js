const StudentModule = require('../src/student');

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

  it('#query should query students', () => {
    const queryString = '1, 2, 3';
    const dataSource = [{
      studentNum: '1'
    },{
      studentNum: '3'
    },{
      studentNum: '4'
    }];
    const expectedResult = [{
      studentNum: '1'
    },{
      studentNum: '3'
    }];

    expect(StudentModule.Student.query(queryString, dataSource)).toEqual(expectedResult);
  });
});

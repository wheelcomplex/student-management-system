const StudentModule = require('../src/student');

describe('Student', () => {
  it('.validateStudentString should validate student string', () => {
    const studentString = '李四, 02, 汉, 01, 语文: 80, 数学: 90, 英语: 70';

    expect(StudentModule.Student.validateStudentString(studentString)).toEqual(true);
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

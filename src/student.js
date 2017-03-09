class Student {
  constructor(name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore) {
    this.name = name;
    this.studentNum = studentNum;
    this.ethnic = ethnic;
    this.klass = klass;
    this.mandarin = mandarin;
    this.mandarinScore = mandarinScore;
    this.math = math;
    this.mathScore = mathScore;
    this.english = english;
    this.englishScore = englishScore;
    this.programming = programming;
    this.programmingScore = programmingScore;
  }
  
  static validateStudentString(studentString){
    // TODO: implement regex
    const re = /^[\u4e00-\u9fa5]{1,4}, [0-9]{2}, [\u4e00-\u9fa5], [\u4e00-\u9fa5]{1,10}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}$/;
    return re.test(studentString);
  }

  static initStudentFromString(studentString){
    const re = /([\u4e00-\u9fa5]{1,4}), ([0-9]{2}), ([\u4e00-\u9fa5]), ([\u4e00-\u9fa5]{1,10}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3})/;
    var name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore;
    [name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore] = studentString.match(re).slice(1);
    return new Student(name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore);
  }

  static validateQueryString(queryString){
    // TODO: implement regex
    return true;
  }

  static query(queryString, dataSource){
    // TODO: implement query
    return dataSource.filter((student) => {
      return queryString.split(', ').includes(student.studentNum);
    });
  }
}

module.exports.Student = Student;
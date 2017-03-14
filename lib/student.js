let studentsDB = [];

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

  save(){
    studentsDB.push(this);
  }

  averageScore(){
    return (this.totalScore() / 4);
  }

  totalScore(){
    return (Number(this.mandarinScore) + Number(this.mathScore) + Number(this.englishScore) + Number(this.programmingScore));
  }
  
  static validateStudentString(studentString){
    const re = /^[\u4e00-\u9fa5]{1,4}, [0-9]{2}, [\u4e00-\u9fa5], [\u4e00-\u9fa5]{1,10}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}, [\u4e00-\u9fa5]{1,10}: [0-9]{1,3}$/;
    return re.test(studentString);
  }

  static initStudentFromString(studentString){
    const re = /([\u4e00-\u9fa5]{1,4}), ([0-9]{2}), ([\u4e00-\u9fa5]), ([\u4e00-\u9fa5]{1,10}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3}), ([\u4e00-\u9fa5]{1,10}): ([0-9]{1,3})/;
    let name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore;
    [name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore] = studentString.match(re).slice(1);
    return new Student(name, studentNum, ethnic, klass, mandarin, mandarinScore, math, mathScore, english, englishScore, programming, programmingScore);
  }

  static validateQueryString(queryString){
    const re = /^[0-9]{2}(, [0-9]{2})*$/;
    return re.test(queryString);
  }

  static query(queryString){
    return studentsDB.filter((student) => {
      return queryString.split(', ').includes(student.studentNum);
    });
  }

  static averageOfTotalScoreSum(students){
    if (students.length === 0){
      return 0;
    }

    return students.map((student) => {
      return student.totalScore();
    }).reduce((totalScoreSum, totalScore) => {
      return totalScoreSum + totalScore;
    }) / students.length;
  }

  static medianOfTotalScoreSum(students){
    if (students.length === 0){
      return 0;
    }

    return students.map((student) => {
      return student.totalScore();
    }).sort((left, right) => {
      return left - right;
    })[Math.round(students.length / 2) - 1];
  }
}

module.exports.Student = Student;
class Student {
  constructor(studentString) {
    // TODO: finish regex for new student
    var matchedResult = studentString.match(/[a-z]/g);
  }
  
  static validateStudentString(studentString){
    // TODO: implement regex
    return true;
  }

  static validateQueryString(queryString){
    // TODO: implement regex
    return true;
  }

  static query(queryString, dataSource){
    // TODO: implement query
    return dataSource;
  }
}

module.exports.Student = Student;
const express = require('express');
const bodyParser = require('body-parser');
const StudentModule = require('../../lib/student');
const RoundAtMost1DecimalModule = require('../../lib/roundAtMost1Decimal');

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.render('home/root');
});

app.get('/home', (req, res) => {
  res.render('home/index');
});

app.get('/3', (req, res) => {
  res.render('home/exit');
});

app.get('/1', (req, res) => {
  res.render('students/new', {displayErrorMessage: req.query.displayErrorMessage});
});

app.post('/students/create', (req, res) => {
  if(StudentModule.Student.validateStudentString(req.body.student)){
    let student = StudentModule.Student.initStudentFromString(req.body.student);
    student.save();

    res.render('students/create', {student: student});
  } else {
    res.redirect('/1?displayErrorMessage=true');
  }
});

app.get('/2', (req, res) => {
  res.render('students/query', {displayErrorMessage: req.query.displayErrorMessage});
});

app.post('/students', (req, res) => {
  if(StudentModule.Student.validateQueryString(req.body.query)){
    let students = StudentModule.Student.query(req.body.query);

    res.render('students/index', {students: students, roundAtMost1Decimal: RoundAtMost1DecimalModule.roundAtMost1Decimal, Student: StudentModule.Student});
  } else {
    res.redirect('/2?displayErrorMessage=true');
  }
});

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});

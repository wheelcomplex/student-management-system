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

// app.get('/', express.static('public/index.html'));

// app.get('/', (req, res) => {
//   res.render('home/root');
// });

app.listen(3000, () => {
    console.log('Express app listening on http://alphadoc.xl.david.city:3000');
});
const express = require('express');
const path = require('path');
const routes = require('./routers');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.use('/shipping',routes);

app.listen(process.env.PORT||8000, () => {
  console.log(`Example app listening on port ${process.env.PORT||8000}!`)
});
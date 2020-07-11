const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');

const path = require('path')
const blogRouter = require('./routes/apiRoutes');

const app = express();

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({extended: true}));

app.engine('handlebars',expressHbs());
app.set('view engine','handlebars');
app.set('views','views');

app.use(blogRouter);

app.listen(3000);

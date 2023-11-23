const express = require('express');

const loginRouter = require('./router/login.router');
const userRouter = require('./router/user.router');
const categoriesRouter = require('./router/categories.router');
const blogPostRouter = require('./router/blogPost.router');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', blogPostRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

module.exports = function(app){
  app.use('/', require('./routes/home'));
  app.use('/users', require('./routes/users'));
  app.use('/sessions', require('./routes/sessions'));
  app.use('/api', require('./routes/api'));
  app.use('/beers', require('./routes/beers'));
  app.use('/comments', require('./routes/comment'));
};

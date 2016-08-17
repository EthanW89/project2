const pgp = require('pg-promise')();
const db = pgp('postgres://ethanweiskopf@localhost:5432/project2');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var auth_error = 'Incorrect Email / Password!';

  db.one(
    "SELECT * FROM users WHERE email = $1",
    [email]
  ).catch(function(){
    res.error = auth_error;
    next();
  }).then(function(user){
    bcrypt.compare(
      password,
      user.password_digest,
      function(err, cmp){
        if(cmp){
          req.session.user = {
            'email': user.email
          };
          next();
        } else {
          res.error = auth_error;
          next();
        }
      }
    );
  });
};

var logout = function(req, res, next){
  req.session.user = null;
  next()
};

var create_user = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, 10, function(err, hashed_password){
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
      [email, hashed_password]
    ).catch(function(){
      res.error = 'Error. User could not be created.';
      next();
    }).then(function(user){
      req.session.user = {
        'email': email
      };
      next();
    });
  });
};

var create_beer = function(req, res, next){
  var name = req.body.name;
  var description = req.body.description;

  db.one('INSERT INTO beers (name, description) VALUES ($1, $2) RETURNING id',
    [name, description]
  ).then(function(id) {
    console.log("cool");
    res.success = id;
    next();
  }).catch(function(error){
    console.log(error);
    res.error = "nope";
    next();
  })
}

var get_beer = function(req, res, next){
  var id = req.params.id;
  db.one('SELECT * FROM beers WHERE id= $1', [id]
    ).catch(function(){
      res.error = "Error";
      next();
    }).then(function(data){
      console.log(data);
      res.render("beers", data);
      next();
  });
}

var create_comment = function(req, res, next) {
  var email = req.session.user.email;
  var name = req.body.name;
  var comment = req.body.comment;

  db.one('INSERT INTO comments (user_id, beer_id, comment) VALUES ($1, $2, $3) RETURNING id',
    [email, name, comment]
  ).then(function(id) {
    console.log("cool");
    res.success = id;
    next();
  }).catch(function(error){
    console.log(error);
    res.error = "nope";
    next();
  })
}

// db.any(
//    `SELECT playlists.playlist_url, users.id
//    FROM playlists
//    JOIN users
//    ON user_id = $1`,
//    [user_id]
//  ).catch(function(){
//    res.error = "Error. Playlists couldn't be retrieved.";
//    next();
//  }).then(function(data){
//    console.log("db select get successful!");
//    console.log("db.js", data);
//    res.json(data);
//    next();
//  })
module.exports = { login, logout, create_user, create_beer, get_beer, create_comment };

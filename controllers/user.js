const knex = require('../db/knex');

module.exports = {
    login_register: (req,res) => {
      res.render('login-register');
    },

    login: (req, res)=>{
    knex("user").where("email", req.body.email).then((results)=>{

      let user = results[0];
      //check user email against database
      console.log(user);
      if(user === undefined){
        res.redirect('/login');
      //check if user put in correct password
      } else if(user.password == req.body.password){
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.save(()=>{
          console.log(req.session);
          res.redirect('/');
        })
        }else{
        res.redirect('/login');
      }
    })
  },

  register: (req, res) => {
    if(req.body.password == req.body.confirm) {
      knex("user").insert({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false
      }).then(() => {
        res.redirect('/')

      })
    }else{
    res.redirect('/')
    }
  },
  // search and remove user
  admin_remove:(req, res)=>{
    console.log(req.query);
    if(!req.query.search) {
      knex('user')
      .then(result => {
        res.render('admin', {users:result});          
      })
      return;
    }
    knex('user').where('username', 'ilike', `${req.query.search}%`).then((result)=>{
      res.render('admin', {users:result});
    })
  },
  remove_user:(req, res)=>{
    knex('user').delete().where('id',req.params.id)
    .then(()=>{
      res.redirect("/admin");
    })
  }

}

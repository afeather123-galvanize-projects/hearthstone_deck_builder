const knex = require('../db/knex');

module.exports = {
    login_register: (req,res) => {
      res.render('login-register');
    },

    login: (req, res)=>{
    knex("user").where("email", req.body.email).then((results)=>{

      let user = results[0];
      //check user email against database
      if(user === undefined){
        res.redirect('/login');
      //check if user put in correct password
      } else if(user.password == req.body.password){
        req.session.user_id = user.id;
        req.session.save(()=>{
        res.redirect('/profile');
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
  }

}

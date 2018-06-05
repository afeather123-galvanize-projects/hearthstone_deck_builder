const knex = require('../db/knex');

module.exports = {
    login_register: (req,res) => {
      res.render('login-register');
    },

    login: (req, res)=>{
    knex("user").where("email", req.body.email).then((results)=>{
      let user = results[0];
      if(user.password == req.body.password){
        req.session.user_id = user.id;
        req.session.save(()=>{
        res.redirect('/profile');
        })
      }else{
        res.redirect("/");
      }
    })
  },

  register: (req, res) => {
    if(req.body.password == req.body.confirm) {
      knex("user").insert({
        name: req.body.name,
      email: req.body.email,
      bio:req.body.bio,
      img_url:req.body.img_url,
      password: req.body.password
      }).then(() => {
        res.redirect('/')

      })
    }else{
    res.redirect('/')
    }
  },
    admin: (req,res) => {

    }

}

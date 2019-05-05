var express = require('express');
var router = express.Router();
let data=[
  {id:1,name:"rawan",age:24},
  {id:2,name:"reem",age:27}];
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.render('myUsers',  {data} );
});
router.get('/user/add', function (req, res, next) {
  res.render('Add', { title: "Add User" });
});
router.post('/user/add', function (req, res, next) {
  req.body.id = data.length + 1;
  data.push(req.body);
  res.render('myUsers',  {data} );
})
router.get('/user/delete/:id', function(req, res, next) {
 
 console.log(req.params.id);
 data.splice( data.indexOf( data.filter(u=>u.id==req.params.id)[0]),1);
res.redirect('/users');
});
router.get('/user/update/:id', function (req, res, next) {
  const user=( data.filter(u=>u.id==req.params.id)[0])
  res.render('Update', { name: user.name,age:user.age,id:user.id});
});
router.post('/user/update', function (req, res, next) {
  console.log(req.body.id);
 data= data.map((item) => (
    item.id == req.body.id ? { ...item, name: req.body.name,age:req.body.age} : item
  ))
  res.redirect('/users');
})

module.exports = router;

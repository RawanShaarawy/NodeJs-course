var express = require('express');
var router = express.Router();
const data=[
  {id:1,name:"rawan shaarawy",age:24},
  {id:2,name:"reem shaarawy",age:27}];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('myUsers',  {data} );
});

module.exports = router;
module.exports.data = data;

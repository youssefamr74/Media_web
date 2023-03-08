var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'domdom' , saveUninitialized: false , resave: false , cookie: {sameSite: true } } ));



let data = fs.readFileSync('users.json');
let object = JSON.parse(data);


app.get('/', function(req, res) {
  res.render('login', {flag1:"",flag2:""});
});

app.get('/login', function(req, res) {
  res.render('login', {flag1:"",flag2:""});
});

app.post('/', function(req,res){
  function validate1(){
    for (let index = 0 ; index < object.user.length; index++){
      if (req.body.username == object.user[index].username){
          req.session.username = req.body.username ;
          req.session.password = object.user[index].password ;
          return true;
      }   
    }
  return false;
  }
  function validate2(){
      if (validate1() && req.body.password == req.session.password){
          return true ;
      }
  return false;
  }

  if(validate1()&&validate2()){
    res.render('home');
  }
  else{
    if(validate1()&& !validate2()){
      res.render('login' , {flag1:"" ,flag2:"incorrect password."}); 
    }
    else if((!validate1()&& !validate2()) || !validate1()){
      res.render('login' , {flag1:"can not find this username.",flag2:""});
    }

  }
  
});


app.get('/registration',function(req,res){
  res.render('registration', {flag:""});
});

// urlencodedParser ,
app.post('/registration', function(req,res){
  function validate2(){
    for (let index = 0 ; index < object.user.length; index++){
      if (req.body.username == object.user[index].username){
          return false ;
      }   
    }
  return true ;
  }

  if(!validate2()){
    res.render('registration' , {flag:"username already exists."});
  }
  else if(validate2()){
  let object1 = {username : req.body.username , password : req.body.password , watchlist : [] };
  object.user.push(object1);
  let strg = JSON.stringify(object);
  fs.writeFileSync('users.json',strg);
  res.render('register');
  }
});

app.get('/register', function(req,res){
  res.render('register');
});

app.post('/register', function(req,res){
  res.render('login', {flag1:"",flag2:""});
});


app.get('/home', function(req,res) {
  res.render('home');
});

app.post('/home',function(req,res){
  res.render('home');
});


app.get('/search',function(req,res){
  let arr = [] ;
  res.render('searchresults',{results:arr});
});

app.post('/search', function(req,res){
  let movies = ["conjuring","scream","fightclub","darkknight","godfather","godfather2"] ;
  let arr = [] ;  
  for(let i=0 ; i < movies.length ; i++)
  {
    if((movies[i].toLowerCase().includes(req.body.Search) || movies[i].toUpperCase().includes(req.body.Search)) 
                                                          && req.body.Search != ""){
      arr.push(movies[i]);
    }
  }
  if(arr.length == 0){
    arr.push("_1display error");
  }
  res.render('searchresults',{results:arr});
});


app.get('/horror', function(req, res) {
  res.render('horror');
});

app.get('/drama', function(req, res) {
  res.render('drama');
});

app.get('/action', function(req, res) {
  res.render('action');
});

app.get('/watchlist', function(req, res) {
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  res.render('watchlist', {watchL : object.user[which_user].watchlist} );
});

app.get('/conjuring', function(req, res) {
  res.render('conjuring',{flag:""});
});

app.post('/conjuring',function(req,res){
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  function watchlist_exists(){
      for (let i = 0; i < object.user[which_user].watchlist.length; i++) {
        if(object.user[which_user].watchlist[i] == "conjuring") {
            return true ;} 
      }
      return false ;
  }
  if(watchlist_exists()){
    res.render('conjuring',{flag:"The film in your watchlist."});
  }
  else{
    object.user[which_user].watchlist.push("conjuring");
    let strg = JSON.stringify(object);
    fs.writeFileSync('users.json',strg);
    res.render('conjuring',{flag:"Done"});
  }
});

app.get('/scream', function(req, res) {
  res.render('scream',{flag:""});
});

app.post('/scream',function(req,res){
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  function watchlist_exists(){
      for (let i = 0; i < object.user[which_user].watchlist.length; i++) {
        if(object.user[which_user].watchlist[i] == "scream") {
            return true ;} 
      }
      return false ;
  }
  if(watchlist_exists()){
    res.render('scream',{flag:"The film in your watchlist."});
  }
  else{
    object.user[which_user].watchlist.push("scream");
    let strg = JSON.stringify(object);
    fs.writeFileSync('users.json',strg);
    res.render('scream',{flag:"Done"});
  }
});

app.get('/darkknight', function(req, res) {
  res.render('darkknight',{flag:""});
});

app.post('/darkknight',function(req,res){
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  function watchlist_exists(){
      for (let i = 0; i < object.user[which_user].watchlist.length; i++) {
        if(object.user[which_user].watchlist[i] == "darkknight") {
            return true ;} 
      }
      return false ;
  }
  if(watchlist_exists()){
    res.render('darkknight',{flag:"The film in your watchlist."});
  }
  else{
    object.user[which_user].watchlist.push("darkknight");
    let strg = JSON.stringify(object);
    fs.writeFileSync('users.json',strg);
    res.render('darkknight',{flag:"Done"});
  }
});

app.get('/fightclub', function(req, res) {
  res.render('fightclub',{flag:""});
});

app.post('/fightclub',function(req,res){
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  function watchlist_exists(){
      for (let i = 0; i < object.user[which_user].watchlist.length; i++) {
        if(object.user[which_user].watchlist[i] == "fightclub") {
            return true ;} 
      }
      return false ;
  }
  if(watchlist_exists()){
    res.render('fightclub',{flag:"The film in your watchlist."});
  }
  else{
    object.user[which_user].watchlist.push("fightclub");
    let strg = JSON.stringify(object);
    fs.writeFileSync('users.json',strg);
    res.render('fightclub',{flag:"Done"});
  }
});

app.get('/godfather', function(req, res) {
  res.render('godfather',{flag:""});
});

app.post('/godfather',function(req,res){
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  function watchlist_exists(){
      for (let i = 0; i < object.user[which_user].watchlist.length; i++) {
        if(object.user[which_user].watchlist[i] == "godfather") {
            return true ;} 
      }
      return false ;
  }
  if(watchlist_exists()){
    res.render('godfather',{flag:"The film in your watchlist"});
  }
  else{
    object.user[which_user].watchlist.push("godfather");
    let strg = JSON.stringify(object);
    fs.writeFileSync('users.json',strg);
    res.render('godfather',{flag:"Done"});
  }
});

app.get('/godfather2', function(req, res) {
  res.render('godfather2',{flag:""});
});

app.post('/godfather2',function(req,res){
  let which_user = 0;
  for (let index = 0; index < object.user.length; index++) {
    if(object.user[index].username == req.session.username)
    {
      which_user = index ;   
    }
  }
  function watchlist_exists(){
      for (let i = 0; i < object.user[which_user].watchlist.length; i++) {
        if(object.user[which_user].watchlist[i] == "godfather2") {return true ;} 
      }
      return false ;
  }
  if(watchlist_exists()){
    res.render('godfather2',{flag:"The film in your watchlist"});
  }
  else{
    object.user[which_user].watchlist.push("godfather2");
    let strg = JSON.stringify(object);
    fs.writeFileSync('users.json',strg);
    res.render('godfather2',{flag:"Done"});
  }
});


// app.js[online+local]
if(process.env.PORT){
  app.listen(process.env.PORT);
}
else{
  app.listen(3000, function(){
    console.log('server is running')
  });
}



module.exports = app;

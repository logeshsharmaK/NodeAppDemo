const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const testUsers = {}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res, next) => {
  res.send('pong')
});

app.post('/user/verify', (req, res, next) => {
  const token = req.body.token

  console.log("POST /user/verify. token: ", token);

  const userData = verifyUser(token)

  console.log("userData", userData);

  if (!userData) {
    return res.status(422).json({error: "User token is invalid"})
  }
  return res.status(200).json(userData)
});

app.get('/user/verify', (req, res, next) => {
  const token = req.query.token

  console.log("GET /user/verify. token: ", token);

  const userData = verifyUser(token)

  console.log("userData", userData);

  if (!userData) {
    return res.status(422).json({error: "User token is invalid"})
  }
  return res.status(200).json(userData)
});

function verifyUser(token) {

console.log("token ...................", token);
  // TODO:
  // here basically we need to verify a provided data (e.g. token)) against DB
  // and if the provided token is valid -> return a data with specified format back to ConnectCube server,
  // as described here https://developers.connectycube.com/guides/custom-identity-provider

  const isValid = isTokenValid(token);
  if (!isValid) {
    return null
  }

  let userData = testUsers[token]
  if (!userData) {
	  let randomMultiples 
	  let uFullName
	  if(token == "1"){
		  randomMultiples  = 1000000
		  uFullName = "Logesh sharma1";
	  }else if(token == "2"){
		  randomMultiples  = 10000
		  uFullName = "Logesh sharma2";
	  }
    const userID = Math.floor(Math.random() * randomMultiples);

    const uLogin = "login_" + userID;
    const uEmail = userID + "@test.com";
	console.log("randomMultiples", randomMultiples);
	console.log("uFullName", uFullName);

    userData = {
        uid: userID,
      login: uLogin,
      email: uEmail,
      fullName: uFullName,
    };

    testUsers[token] = userData
  }

  return userData;
}

function isTokenValid(token) {
  // TODO:
  // here basically we need to verify a provided data (e.g. token)) against DB

  // For a test purpose we will be returning true all the time

  return true
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;

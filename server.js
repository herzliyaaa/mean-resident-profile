const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dbConfig = require('./server/db/config');


// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const residentRoute = require('./server/routes/resident.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));


app.use(cors());
app.use(morgan('dev'));
app.use('/public', express.static(path.join('public')));
app.use('/public', express.static('public'))
app.use('/api', residentRoute)

// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
   console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
   console.error(err.message); // Log error message in our server's console
   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
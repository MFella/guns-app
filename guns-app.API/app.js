const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

require('./config/passport')(passport);

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error  ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS Middleware
// app.use(cors({
//     origin: 'http://localhost:4200'
// }));
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.listenerCount(passport.initialize());
app.listenerCount(passport.session());

//

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


//Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port );
});


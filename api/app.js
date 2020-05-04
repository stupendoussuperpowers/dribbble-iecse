const express = require("express")
const mongoose = require("mongoose")

const passport = require('passport')

const redis = require('redis')
const redisClient = redis.createClient({host:'redis', port:6379})
const session = require('express-session')
const redisStore = require('connect-redis')(session)

const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()


app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
  extended: true  
}))


const passportConfig = (passport) => {
    passport.serializeUser((User,done) => {
      return done(null,User);
    });
  
    passport.deserializeUser((User,done) => {
      return done(null,User);    
    });
}

passportConfig(passport);



redisClient.on('error', (err) => {
    console.log(err);
})

app.use(session({
    secret: 'istolethemfromthepresident',
    name: 'dribbbleiecse',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 604800000},
    store: new redisStore({
        host: 'redis',
        port: 6379,
        client: redisClient,
        ttl: 86400
    })
}))

app.use(passport.initialize())
app.use(passport.session())

var mongouri = "mongodb://root:root@db:27017/dribbble";

mongoose.connect(
    mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) console.log(err);
        else console.log("Connected to MongoDB");
    }
);


app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/api', routes)

app.listen(3000,() => "Listening on port 3000")

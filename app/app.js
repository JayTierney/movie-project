require('dotenv').config('.env');
const express = require('express')
const app = express()
const cors = require('cors');
const { movieRt, userRt } = require('../route')
const { seed } = require('../models')
const { auth } = require('express-openid-connect');
const morgan = require('morgan');
const { AUTH0_SECRET, AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_BASE_URL } = process.env;

const config = {
    authRequired: true,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: AUTH0_AUDIENCE,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_BASE_URL,
  };

  const { User, Movie } = require('../db');
  const checkRegisteredUser = async (req, res, next) => {
    const [user, created] = await User.findOrCreate({where: {
      name: req.oidc.user.name,
      },
    });
    console.log(user);
    next();
  };

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(auth(config), checkRegisteredUser);
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use('/movie', movieRt);
app.use('/user', userRt);

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

async function server (port) {

    await seed()

    app.listen(port, () => {
        console.log(`App.js running at http://localhost:${port}`)
    })

}

server(3001)

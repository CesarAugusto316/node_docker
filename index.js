const express = require('express');
const { connectDb } = require('./config/connectDb.js');
const config = require('./config/config.js');
const { postsRouter } = require('./routes/posts.router.js');
const { authRouter } = require('./routes/auth.router.js');
const { defaultErrorHandler } = require('./middlewares/defaultErrorHandler.js');
const session = require('express-session');
const redisDb = require('redis');
const RedisStore = require('connect-redis')(session);


// redis client initialization
const redisClient = redisDb.createClient({
  url: `redis://${config.redis.ip}:${config.redis.port}`,
  legacyMode: true // required for version 3 or 4
});

// redis client connection test
redisClient.connect()
  .then(() => {
    console.log('[Redis DB ⚡] connected');
  })
  .catch(err => {
    console.log(err);
  });

const PORT = process.env.PORT;
const app = express();
connectDb();

// middlewares
app.use(express.json());
// we use our redis database to store a express-session
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: config.session.secret,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30_000
  }
}));

app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', authRouter);
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`[NODE_ENV ⚡] ${process.env.NODE_ENV}`);
  console.log(`[Server ⚡] running on port ${PORT}`);
});

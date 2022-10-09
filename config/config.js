module.exports = {
  mongodb: {
    ip: process.env.DB_IP || 'mongodb',
    userName: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  },
  redis: {
    ip: process.env.REDIS_IP || 'redisdb',
    port: process.env.REDIS_PORT || 6379,
  },
  session: {
    secret: process.env.SESSION_SECRET || '12312hkskdhkasdasdas'
  }
};

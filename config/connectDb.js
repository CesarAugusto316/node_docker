const mongoose = require('mongoose');
const { ip, password, port, userName } = require('./config.js').mongodb;


const connectDb = () => {
  mongoose
    .connect(
      `mongodb://${userName}:${password}@${ip}:${port}?authSource=admin`,
      { dbName: 'my_db' }
    )
    .then(({ connection }) => {
      console.log(`[Mongo DB ⚡] connected to ${connection.db.databaseName} database`);
    })
    .catch(error => {
      console.log(error.message);
      setTimeout(connectDb, 3_000);
    });
};

module.exports = { connectDb, mongoose };

const express = require('express');


const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello world from docker'
  });
});

app.listen(PORT, () => {
  console.log(`[NODE_ENV ⚡] ${process.env.NODE_ENV}`);
  console.log(`[Server ⚡] running on port ${PORT}`);
});

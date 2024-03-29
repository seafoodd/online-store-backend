require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const fs = require('fs');
const https = require('https');

const http = require('http');
const httpApp = express();

httpApp.all('*', (req, res) =>
  res.redirect(301, `https://${req.hostname}${req.url}`)
);

http.createServer(httpApp).listen(80, () => {
  console.log('HTTP server listening on port 80');
});

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 443;

const options = {
  key: fs.readFileSync('./cert/privkey.pem'),
  cert: fs.readFileSync('./cert/fullchain.pem'),
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// middleware который обрабатывает ошибки всегда должен стоять последним
app.use(errorHandler);

const server = https.createServer(options, app);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

const express = require('express');
const app = express();
const cors = require('cors');

const { config } = require('./config/index');
const userApi = require('./routes/users');
const authApi = require('./routes/auth');
const { logError, wrraperError, errorHandler } = require('./utils/middleware/errorsHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(cors())
app.use(express.json());
userApi(app);
authApi(app);
app.use(notFoundHandler);
app.use(logError);
app.use(wrraperError);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});
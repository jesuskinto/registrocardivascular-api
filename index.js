const express = require('express');
const app = express();
const cors = require('cors');

const { config } = require('./config/index');
const userApi = require('./routes/users');
const authApi = require('./routes/auth');
const surgeonApi = require('./routes/surgeons');
const patientApi = require('./routes/patients');
const pphApi = require('./routes/pph');
const coronaryAngiographyApi = require('./routes/coronaryAngiography');
const extracorporealCirculation = require('./routes/extracorporealCirculation');
const heartSurgery = require('./routes/heartSurgery');
const others = require('./routes/others');
const surgicalProtocols = require('./routes/surgicalProtocols');
const transthoracicEchocardiogram = require('./routes/transthoracicEchocardiogram');
const { logError, wrraperError, errorHandler } = require('./utils/middleware/errorsHandler');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(cors())
app.use(express.json());
userApi(app);
authApi(app);
surgeonApi(app);
patientApi(app);
pphApi(app);
coronaryAngiographyApi(app);
extracorporealCirculation(app);
heartSurgery(app);
others(app);
surgicalProtocols(app);
transthoracicEchocardiogram(app);

app.use(notFoundHandler);
app.use(logError);
app.use(wrraperError);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});
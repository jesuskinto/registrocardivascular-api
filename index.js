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
const extracorporealCirculationApi = require('./routes/extracorporealCirculation');
const heartSurgeryApi = require('./routes/heartSurgery');
const othersApi = require('./routes/others');
const surgicalProtocolsApi = require('./routes/surgicalProtocols');
const transthoracicEchocardiogramApi = require('./routes/transthoracicEchocardiogram');
const diagnosisApi = require("./routes/diagnosis");
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
extracorporealCirculationApi(app);
heartSurgeryApi(app);
othersApi(app);
surgicalProtocolsApi(app);
transthoracicEchocardiogramApi(app);
diagnosisApi(app);

app.use(notFoundHandler);
app.use(logError);
app.use(wrraperError);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`);
});
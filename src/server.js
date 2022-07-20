import express from 'express';
import configViewEngine from './configs/viewEngine';
import initViewEngine from './route/web';
// import connection from './configs/connectDB';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set ip view engine
configViewEngine(app);
// init web route
initViewEngine(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

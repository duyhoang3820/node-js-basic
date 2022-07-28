import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

const initWebRoute = (app) => {
  router.get('/', homeController.getHomepage);
  router.get('/detail/user/:id', homeController.getDetailPage);
  router.post('/create', homeController.createNewUser);
  router.post('/delete', homeController.deleteUser);
  router.get('/edit/:id', homeController.getEditPage);
  router.post('/update', homeController.updateUser);

  router.get('/upload', homeController.getUploadFilePage);
  router.post('/upload-profile-pic', homeController.handleUploadFile);

  router.get('/about', (req, res) => {
    res.send(`I'm Duy`);
  });

  return app.use('/', router);
};

module.exports = initWebRoute;

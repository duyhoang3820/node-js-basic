import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';
import help from 'nodemon/lib/help';

let getHomepage = async (req, res) => {
  //logic
  const [rows, fields] = await pool.execute('SELECT * FROM `users`');
  return res.render('index.ejs', { dataUser: rows });
};
let getDetailPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return res.send(JSON.stringify(user));
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    'INSERT INTO users(firstName,lastName,email,address) values(?,?,?,?)',
    [firstName, lastName, email, address]
  );
  return res.redirect('/');
};
let deleteUser = async (req, res) => {
  let id = req.body.userId;
  await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return res.redirect('/');
};
let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  return res.render('update.ejs', { dataUser: user[0] });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    'UPDATE users SET firstName = ?, lastName = ?,email = ?, address = ? WHERE id = ?',
    [firstName, lastName, email, address, id]
  );
  return res.redirect('/');
};
let getUploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs', {});
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

let handleUploadFile = async (req, res) => {
  let upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter,
  }).single('profile_pic');
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image up upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    res.send(
      `You have uploaded this image: <hr/><img src='${req.file.path}' width="500"><hr/> <a href='./'>Upload another image</a>`
    );
  });
};

module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
};

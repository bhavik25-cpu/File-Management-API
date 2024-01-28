const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const fileUpload = require('../middlewares/fileUpload');

router.post('/upload', fileUpload.single('file'), fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.get('/search', (req, res, next) => {
  const query = req.query.findfile;
  fileController
    .searchFiles(query)
    .then((files) => res.json(files))
    .catch(next);
});
router.delete('/:filename', fileController.deleteFile);

module.exports = router;


const fileService = require('../services/fileService');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../uploads');

const fs = require('fs/promises');


const uploadFile = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const result = await fileService.uploadFile(file);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const listFiles = async (req, res, next) => {
  try {
    const files = await fileService.listFiles();
    return res.json(files);
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const result = await fileService.deleteFile(filename);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};



const searchFiles = async (query) => {
  try {
    const files = await fs.readdir(UPLOADS_DIR);
    const filteredFiles = files.filter((filename) => filename.includes(query));
    return filteredFiles.map((filename) => ({ filename }));
  } catch (error) {
    console.error('Error searching files:', error);
    throw error;
  }
};
module.exports = { uploadFile, listFiles, deleteFile,searchFiles  };

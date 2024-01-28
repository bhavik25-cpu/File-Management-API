const fs = require('fs/promises');
const path = require('path');
const UPLOADS_DIR = path.join(__dirname, '../uploads');
const encryptionUtil = require('../utils/encryptionUtil');

const uploadFile = async (file) => {
  const { originalname, filename } = file;
  const filePath = path.join(UPLOADS_DIR, filename);

  await fs.rename(file.path, filePath);

  const encryptedOriginalname = encryptionUtil.encryptData(originalname);

  return { originalname: encryptedOriginalname, filename, filePath };
};

const listFiles = async () => {
  try {
    const files = await fs.readdir(UPLOADS_DIR);
    return files.map((filename) => ({
      filename,
    }));
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

const deleteFile = async (filename) => {
  const filePath = path.join(UPLOADS_DIR, filename);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    return { message: `File ${filename} deleted successfully` };
  } catch (error) {
    throw new Error(`File ${filename} not found`);
  }
};

module.exports = { uploadFile, listFiles, deleteFile };

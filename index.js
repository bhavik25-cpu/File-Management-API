const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const errorHandler = require('./middlewares/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/files', fileRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandlers');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
  module.exports = app;
  
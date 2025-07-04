exports.notFoundHandler = (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  };
  
  exports.errorHandler = (err, req, res, next) => {
    // console.log(err.stack);
    res.status(500).json({ message: 'Server Error' });
  };
  
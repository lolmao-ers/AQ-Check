const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/smog';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log("Database is connected!"))
  .catch((err) => console.log(err));


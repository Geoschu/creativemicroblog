const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts');
mongoose.connect("mongodb+srv://smyles808:sIQymf5qi4tv0Dli@tech-thoughts.eyehbhe.mongodb.net/tech-thoughts?retryWrites=true&w=majority");
module.exports = mongoose.connection;

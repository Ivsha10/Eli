const mongoose = require('mongoose');
const URI = 'mongodb+srv://elijahleeparrish:AU1AobBv7LjEna1V@cluster0.b13rr8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
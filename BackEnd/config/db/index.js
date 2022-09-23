const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Extras28:mongodb281101@project1.kwqeye0.mongodb.net/?retryWrites=true&w=majority`);
        console.log('connected to MongoDB successfuly');
    }
    catch(error) {
        console.log('connect faile');
        console.log(error);
    }

}


module.exports = { connect };

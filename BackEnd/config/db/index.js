const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connect successfuly');
    }
    catch(error) {
        console.log('connect faile');
        console.log(error);
    }

}


module.exports = { connect };

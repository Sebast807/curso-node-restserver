const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Conexión exitosa :D');
        
    } catch (error) {
        console.log(error);
        throw new Error('Database Error');
    }

}

module.exports = {
    dbConnection
}
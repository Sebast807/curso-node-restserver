const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 30000, // 30 segundos
            socketTimeoutMS: 45000, // 45 segundos
            connectTimeoutMS: 30000, // 30 segundos
        });
        console.log('Conexión exitosa :D');

    } catch (error) {
        console.log(error);
        throw new Error('Database Error', error.message);
    }
}

module.exports = {
    dbConnection
}

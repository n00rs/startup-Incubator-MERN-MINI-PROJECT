const moongose = require('mongoose')

// const DBconnect = moongose.connect()

const connectDB = async () => {
    try {
        const connect = await moongose.connect(process.env.MONGO_URI)
        console.log(`DBconneted : ${connect.connection.port}`);
    } catch (error) {
        console.log(`mongo error ${error.message}`);
        process.exit(1)
    }
}

module.exports = connectDB
import mongoose from 'mongoose'

const connectDB = async () => {
    try { 
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
    } catch (error) {
        console.error(`Error: ${error.massage}`.red.underline)
        process.exit(1)
    }
}

export default connectDB
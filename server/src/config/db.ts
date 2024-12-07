import mongoose from 'mongoose'

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI

    if (!MONGO_URI) {
        console.error('URI databáze není definováno v .env')
        process.exit(1)
    }

    mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Databáze připojena')
    })
    .catch((err) => {
        console.error('Nastala chyba při připojování k databázi: ', err.message)
    })
}

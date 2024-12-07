import app from './app'
import mongoose from 'mongoose'

// port
const PORT: number = parseInt(process.env.PORT || '8000', 10)

// db and listener
const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  console.error('URI databáze není definováno v .env')
  process.exit(1)
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Databáze připojena')
    app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`))
  })
  .catch((err) => {
    console.error('Nastala chyba při připojování k databázi: ', err.message)
})
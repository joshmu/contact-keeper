const express = require('express')
const connectDB = require('./config/db.js')

const PORT = process.env.PORT || 5000
const app = express()

// Connect to Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contact Keeper API.' })
)

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/users', require('./routes/users.js'))
app.use('/api/contacts', require('./routes/contacts.js'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

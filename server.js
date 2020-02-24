const express = require('express')
const connectDB = require('./config/db.js')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()

// Connect to Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/users', require('./routes/users.js'))
app.use('/api/contacts', require('./routes/contacts.js'))

// Serve static assets in production (react) << make sure this is after other routes
if (process.env.NODE_ENV === 'production') {
  // Set static folder (react client build folder)
  app.use(express.static('client/build'))
  // Serve index.html file when any other route unspecified is hit
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

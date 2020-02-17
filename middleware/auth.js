const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
  const token = req.header('x-auth-token')

  // check for token
  if (!token) {
    console.error('No auth token provided')
    res.status(401).json({ msg: 'No token. Authorization denied.' })
  }

  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    // pass on user data
    req.user = decoded.user
    next()
  } catch (e) {
    console.error(e.message)
    res.status(401).json({ msg: 'Invalid token' })
  }
}

module.exports = auth

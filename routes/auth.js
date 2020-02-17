const express = require('express')
const router = express.Router()

const User = require('../models/User.js')

const auth = require('../middleware/auth.js')

const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * @route   GET /api/auth
 * @desc    Get logged in user info
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

/**
 * @route   POST /api/auth
 * @desc    Auth user & get token
 * @access  Public
 */
router.post(
  '/',
  [
    check('email', 'Please provide email.').isEmail(),
    check('password', 'Password needs to be minimum of 6 characters.')
      .isString()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    // validate incoming data
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      // validate if on database
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' })
      }

      // validate auth provided
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(400).json({ msg: 'Invalid credentials' })
      }

      // create token & send back
      const payload = {
        user: { id: user.id }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router

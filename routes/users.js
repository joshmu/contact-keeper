const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../models/User.js')

// @route   POST /api/users
// @desc    Register users
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please provide name.')
      .not()
      .isEmpty(),
    check('email', 'Please provide email.').isEmail(),
    check('password', 'Password needs to be minimum of 6 characters.')
      .isString()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (user) {
        return res.status(500).json({ msg: 'User already exists' })
      }

      const createdUser = new User({
        name,
        email,
        password
      })

      const salt = await bcrypt.genSalt(10)
      createdUser.password = await bcrypt.hash(password, salt)

      await createdUser.save()

      res.json({ msg: 'User saved to database.' })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router

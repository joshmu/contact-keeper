const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../models/User.js')

/**
 * @route       POST /api/users
 * @description Register Users
 * @access      Public
 */
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
      const userFound = await User.findOne({ email })
      if (userFound) {
        return res.status(400).json({ msg: 'User already exists' })
      }

      const user = new User({
        name,
        email,
        password
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: { _id: user._id }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 }, // 1 hour
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router

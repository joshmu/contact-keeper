const express = require('express')
const router = express.Router()
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
    check(
      'password',
      'Password needs to be minimum of 6 characters.'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    res.json('Passed!')
  }
)

module.exports = router

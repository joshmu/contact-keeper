const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth.js')
const Contact = require('../models/Contact.js')

// @route   GET /api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    })
    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
  res.send('Get all contacts')
})

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new contact')
})

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contact')
})

// @route   DELETE /api/contacts/:id
// @desc    Remove contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Remove contact')
})

module.exports = router

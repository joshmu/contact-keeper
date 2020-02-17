const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')

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
})

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [
    auth,
    check('name', 'A name is required.').isString(),
    check('email', 'Email required.').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      })
      await newContact.save()
      res.json(newContact)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body

  // consruct updateContact details
  const updateContact = {}
  if (name) updateContact.name = name
  if (email) updateContact.email = email
  if (phone) updateContact.phone = phone
  if (type) updateContact.type = type

  try {
    // find original contact
    let contact = await Contact.findById(req.params.id)

    // make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { lean: true, new: true, upsert: true }
    )
    res.json(contact)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE /api/contacts/:id
// @desc    Remove contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // find original contact
    let contact = await Contact.findById(req.params.id)

    //  make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Contact removed' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router

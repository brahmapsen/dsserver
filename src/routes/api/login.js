const router = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const { OAuth2Client } = require('google-auth-library')
require('../../models')

const clientId = config.get('api.auth.google.clientId')
const secret = config.get('api.secret')
const secretOptions = config.get('api.secretOptions')

const AppUser = mongoose.model('AppUser')
const client = new OAuth2Client(clientId)

router.post('/google', async (req, res) => {
  const { tokenId } = req.body

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: clientId
  })

  const { email, name } = ticket.getPayload()

  let appUser = await AppUser.findOne({ email: email })

  if (!appUser) {
    appUser = await AppUser({
      email,
      name,
      provider: 'google'
    }).save()
  }

  const token = jwt.sign({ email, id: user._id }, secret, secretOptions)
  res.json({ token })
})

module.exports = router

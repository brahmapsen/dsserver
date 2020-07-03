const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const AppUserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "can't be blank"],
      validate: [validator.isEmail, 'invalid email']
    },
    name: { type: String, required: [true, "can't be blank"] },
    provider: { type: String },
    accountAddress: { type: String }
  },
  { timestamps: true }
)

AppUserSchema.index({ email: 1 }, { unique: true })

const AppUser = mongoose.model('AppUser', AppUserSchema)

module.exports = AppUser

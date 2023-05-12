const generate = require('../helpers/generate')
const verify = require('../helpers/verify')
const User = require('../models/user.model')

module.exports.registerController = async (req, res) => {
  let { username, password } = req.body

  const userExist = await User.findOne({ username })

  if (userExist) return res.status(400).send({ message: 'User already exists' })

  password = await generate.hash(password)

  const user = new User({ username, password })

  await user.save()

  return res.status(201).send({ message: 'User created' })
}

module.exports.loginController = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) return res.status(400).send({ message: 'User does not exist' })

  const passwordValid = await verify.hash(password, user.password)

  if (!passwordValid)
    return res.status(400).send({ message: 'Credentials are invalid' })

  const token = generate.jwt({ id: user._id })

  return res.status(200).send({ message: 'User logged in', token })
}

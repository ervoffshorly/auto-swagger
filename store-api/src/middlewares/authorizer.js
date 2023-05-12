const verify = require('../helpers/verify')

module.exports.authorizer = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) return res.status(401).send({ message: 'Unauthorized' })

  const token = bearer.split(' ')[1]

  if (!token) return res.status(401).send({ message: 'Unauthorized' })

  const tokenValid = verify.jwt(token)

  if (!tokenValid) return res.status(401).send({ message: 'Unauthorized' })

  req.userId = tokenValid.id

  next()
}

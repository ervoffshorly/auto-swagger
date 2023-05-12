const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  jwt: payload => jwt.sign(payload, 'secret', { expiresIn: '30d' }),
  hash: async password => await bcrypt.hash(password, 10)
}

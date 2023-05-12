const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  jwt: token => jwt.verify(token, 'secret'),
  hash: (password, hash) => bcrypt.compare(password, hash)
}

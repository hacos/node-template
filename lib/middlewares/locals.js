const { version } = require('../../package.json')

module.exports = function () {
  return function (req, res, next) {
    res.locals.user = req.user
    res.locals.version = version
    next()
  }
}

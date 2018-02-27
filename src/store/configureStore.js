if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod.js'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev.js'); // eslint-disable-line global-require
}

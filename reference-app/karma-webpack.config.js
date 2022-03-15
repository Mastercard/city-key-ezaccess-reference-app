const { ProvidePlugin } = require('webpack')

module.exports = {
  plugins: [
    // fix "process is not defined" error:
    new ProvidePlugin({
      process: 'process/browser',
    })
  ]
}

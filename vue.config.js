const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:5000'
      }
    }
  },
  outputDir: path.resolve(__dirname, './server/public')
}

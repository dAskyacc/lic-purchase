const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const pkgJson = require('../../package.json')

// load env
let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()

commitHash = commitHash.endsWith('\n')
  ? commitHash.substring(0, commitHash.length - 2)
  : commitHash

const EnvHandler = {
  env: {},
  push: (key, value) => {
    if (typeof key === 'string') {
      EnvHandler.env[key] = JSON.stringify(value)
    }
    return EnvHandler
  },
  getEnv: () => {
    return { ...EnvHandler.env }
  },
}

const EJECT_ENV = EnvHandler.push('__QK_DEBUG__', process.env['QK_DEBUG'])
  .push(
    '__APP_AUTHOR__',
    process.env['APP_AUTHOR'] || pkgJson.author || 'admin'
  )
  .push('__APP_VERSION__', pkgJson.version || '0.0.0')
  .push('__COMMIT_HASH__', commitHash || '')

module.exports = [new webpack.DefinePlugin(EJECT_ENV.env)]

module.exports = {
  apps : [{
    name: 'Chaos Monkey',
    script: './index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    env: {
      USER_CONFIG_FILE: './package.json'
    },
    instances: 1
  }]
}

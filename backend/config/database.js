const config = require('./index')

module.exports = {
  development:{
    storage: config.dbFile,
    dialect: 'sqlite',
    seederStorage: 'sequelize',
    logQueryParameters: true,
    typeValidation: true
  },
  production : {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgress',
    seederStorage: 'sequelize',
    dialectOptions:{
      ssl:{
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
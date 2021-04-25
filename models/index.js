const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('greendb', 'postgres', '5432', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 30,
    min: 0,
    port: 5432,
  }
});

sequelize.authenticate('')
  .then(
    () => {
      console.log('Database connected...');
      sequelize.sync({});
      //sequelize.sync( {force:true});
    })
  .catch(err => console.log('Error connecting to db: ' + err));

module.exports = sequelize;

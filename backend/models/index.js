const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mvhinnlf_funlearn_registrations', 'mvhinnlf_admin', 'bUcI=QQt4t~7', {
  host: '37.27.71.198',
  dialect: 'mysql',
});

const Registration = sequelize.define('FunlearnRegistrations', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interests: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
})();

module.exports = {
  sequelize,
  Registration,
};

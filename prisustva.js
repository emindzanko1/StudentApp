const {
  Sequelize,
  DataTypes
} = require("sequelize");
const sequelize = new Sequelize(
  'wt',
  'root',
  'password', {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = function(sequelize) {
  const Prisustva = sequelize.define("Prisustva", {
    prisustvaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sedmica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    predavanja: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vjezbe: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });
  return Prisustva;
}

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
  const Predmet = sequelize.define("Predmet", {
    predmetId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    naziv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brojPredavanjaSedmicno: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brojVjezbiSedmicno: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Predmet;
}

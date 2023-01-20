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
  const Profesor = sequelize.define("Profesor", {
    profesorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });



  return Profesor;
}

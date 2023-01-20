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

  const Student = sequelize.define("Student", {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    ime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  return Student;
}

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
var port = process.env.PORT || 3000;

const Sequelize = require("sequelize");
const sequelize = require("./baza.js");
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const Profesor = require("./profesor.js")(sequelize);
const Predmet = require("./predmet.js")(sequelize);
const Student = require("./student.js")(sequelize);
const Prisustva = require("./prisustva.js")(sequelize);

Predmet.belongsTo(Profesor, {
  foreignKey: {
    name: "profesorId",
    field: "profesorId",
    allowNull: false
  },
  onDelete: "CASCADE"
});

Profesor.hasMany(Predmet, {
  foreignKey: {
    name: "profesorId",
    field: "profesorId",
    allowNull: false
  },
  onDelete: "CASCADE"
});

Prisustva.belongsTo(Student, {
  targetKey: "index",
  foreignKey: {
    name: "studentIndex",
    field: "studentIndex",
    allowNull: false
  },
  onDelete: "CASCADE"
});

Student.hasMany(Prisustva, {
  sourceKey: "index",
  foreignKey: {
    name: "studentIndex",
    field: "studentIndex",
    allowNull: false
  },
  onDelete: "CASCADE"
});

Prisustva.belongsTo(Predmet, {
  foreignKey: {
    name: "predmetId",
    field: "predmetId",
    allowNull: false
  },
  onDelete: "CASCADE"
});

Predmet.hasMany(Prisustva, {
  foreignKey: {
    name: "predmetId",
    field: "predmetId",
    allowNull: false
  },
  onDelete: "CASCADE"
});

sequelize.sync({
  force: true
}).then(() => {
  console.log("Tables create successfully!");

  Profesor.create({
    profesorId: 1,
    username: "Meho Mehic",
    password_hash: "$2a$10$mvWcXpYZud/5rpGX5WYmDuMbkWwuhbyJPos6cYsWos6vL3NG5PCJm"
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Profesor.create({
    profesorId: 2,
    username: "Hamo Hamic",
    password_hash: "$2a$10$Z6wJlD4YBcORMD5ABggyKefGGTTCnYQ.AlWO5eV2TzWMvMJLmm1HK"
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Predmet.create({
    predmetId: 1,
    naziv: "Algoritmi i strukture podataka",
    profesorId: 1,
    brojPredavanjaSedmicno: 3,
    brojVjezbiSedmicno: 2
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Predmet.create({
    predmetId: 2,
    naziv: "Diskretna matematika",
    profesorId: 1,
    brojPredavanjaSedmicno: 4,
    brojVjezbiSedmicno: 4
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Predmet.create({
    predmetId: 3,
    naziv: "Razvoj programskih rjesenja",
    profesorId: 2,
    brojPredavanjaSedmicno: 3,
    brojVjezbiSedmicno: 3
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Predmet.create({
    predmetId: 4,
    naziv: "Web tehnologije",
    profesorId: 2,
    brojPredavanjaSedmicno: 2,
    brojVjezbiSedmicno: 2
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Student.create({
    studentId: 1,
    ime: "Emin Dzanko",
    index: 18763
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Student.create({
    studentId: 2,
    ime: "Lea Jesenkovic",
    index: 18680
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

  Student.create({
    studentId: 3,
    ime: "Benjamin Azman",
    index: 18789
  }).then(res => {
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  }).then(res => {
    Prisustva.bulkCreate([{
        prisustvaId: 1,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 1
      }, {
        prisustvaId: 2,
        sedmica: 1,
        predavanja: 0,
        vjezbe: 2,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 3,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 4,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 5,
        sedmica: 2,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 6,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 7,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 8,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 9,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 10,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 11,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 12,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 13,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 14,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 15,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 16,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 17,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 18,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 19,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 20,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 21,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 22,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 23,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 24,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 25,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 26,
        sedmica: 9,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 27,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 28,
        sedmica: 10,
        predavanja: 3,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 29,
        sedmica: 10,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 30,
        sedmica: 10,
        predavanja: 0,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 31,
        sedmica: 11,
        predavanja: 3,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 1
      },
      {
        prisustvaId: 32,
        sedmica: 11,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 1
      },
      {
        prisustvaId: 33,
        sedmica: 11,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 1
      },
      {
        prisustvaId: 34,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 35,
        sedmica: 1,
        predavanja: 0,
        vjezbe: 2,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 36,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 37,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 38,
        sedmica: 2,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 39,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 40,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 41,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 42,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 43,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 44,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 45,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 46,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 47,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 48,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 49,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 50,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 51,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 52,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 53,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 54,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 55,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 56,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 57,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 58,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 59,
        sedmica: 9,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 60,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 61,
        sedmica: 10,
        predavanja: 3,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 62,
        sedmica: 10,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 63,
        sedmica: 10,
        predavanja: 0,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 64,
        sedmica: 11,
        predavanja: 3,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 2
      },
      {
        prisustvaId: 65,
        sedmica: 11,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 2
      },
      {
        prisustvaId: 66,
        sedmica: 11,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 2
      },
      {
        prisustvaId: 67,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 68,
        sedmica: 1,
        predavanja: 0,
        vjezbe: 2,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 69,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 70,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 71,
        sedmica: 2,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 72,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 73,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 74,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 75,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 76,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 77,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 78,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 79,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 80,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 81,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 82,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 83,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 84,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 85,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 86,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 87,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 88,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 89,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 90,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 91,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 92,
        sedmica: 9,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 93,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 94,
        sedmica: 10,
        predavanja: 3,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 95,
        sedmica: 10,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 96,
        sedmica: 10,
        predavanja: 0,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 97,
        sedmica: 11,
        predavanja: 3,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 3
      },
      {
        prisustvaId: 98,
        sedmica: 11,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 3
      },
      {
        prisustvaId: 99,
        sedmica: 11,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 3
      },
      {
        prisustvaId: 100,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 101,
        sedmica: 1,
        predavanja: 0,
        vjezbe: 2,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 102,
        sedmica: 1,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 103,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 104,
        sedmica: 2,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 105,
        sedmica: 2,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 106,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 107,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 108,
        sedmica: 3,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 109,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 110,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 111,
        sedmica: 4,
        predavanja: 2,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 112,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 113,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 114,
        sedmica: 5,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 115,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 116,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 117,
        sedmica: 6,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 118,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 119,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 120,
        sedmica: 7,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 121,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 122,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 123,
        sedmica: 8,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 124,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 125,
        sedmica: 9,
        predavanja: 1,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 126,
        sedmica: 9,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 127,
        sedmica: 10,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 128,
        sedmica: 10,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 129,
        sedmica: 10,
        predavanja: 0,
        vjezbe: 0,
        studentIndex: 18789,
        predmetId: 4
      },
      {
        prisustvaId: 130,
        sedmica: 11,
        predavanja: 2,
        vjezbe: 2,
        studentIndex: 18763,
        predmetId: 4
      },
      {
        prisustvaId: 131,
        sedmica: 11,
        predavanja: 2,
        vjezbe: 0,
        studentIndex: 18680,
        predmetId: 4
      },
      {
        prisustvaId: 132,
        sedmica: 11,
        predavanja: 1,
        vjezbe: 1,
        studentIndex: 18789,
        predmetId: 4
      }
    ]).then(res => {
      //console.log(res);
    }).catch(error => {
      console.error("Failed to create a new record : ", error);
    });
    //console.log(res);
  }).catch(error => {
    console.error("Failed to create a new record : ", error);
  });

}).catch((error) => {
  console.log("Unable to create table : ", error);

});


//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: 'true'
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/public/scripts')));

app.get('/isloggedin', function(req, res) {

  if (req.session.loggedIn == true) {
    res.send(req.session.loggedIn);
  } else res.send(false);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/html/prijava.html'));
  //let username = req.session.username;
  //console.log(username);

  //console.log(__dirname);
});

app.post('/login', async (req, res) => {

  let username = req.body.username;
  let password = req.body.password;


  let predmeti = {};

  let prijava = false;


  if (username && password) {

    const profesor = await Profesor.findOne({
      where: {
        username: username
      }
    });

    if (profesor) {

      prijava = true;

      const predmeti = await Predmet.findAll({
        where: {
          profesorId: profesor.profesorId
        }
      });

      if (predmeti) {
        predmeti_lista = []

        for (predmet of predmeti) {
          predmeti_lista.push(predmet.dataValues.naziv);
        }

        //console.log(predmeti_lista);


        bcrypt.compare(password, profesor.password_hash, function(err, result) {
          if (result) {

            req.session.loggedIn = true;
            req.session.username = username;
            req.session.predmeti = predmeti_lista;
            //console.log(req.session.predmeti);
            res.json({
              poruka: "Uspjesna prijava",
              url: "/predmeti.html"
            });
          } else {
            console.log("poruka:Neuspjesna prijava");
            //prijava = false;
            //res.send({"poruka":"Neuspjesna prijava"});
            //res.redirect('/');
          }

        });
      }
    } else {
      //console.error("Unable to retrieve data");
    }

  }


  if (!prijava)
    console.log("poruka:Neuspjesna prijava")

});

app.get('/predmeti', function(req, res) {

  //
  let loggedIn = false;

  if (req.session.loggedIn == true) {
    loggedIn = true;
  }

  if (loggedIn) {
    res.send(req.session.predmeti);
    //res.sendFile(path.join(__dirname, '/public/html/predmeti.html'));
    // res.send();
  } else {
    res.send({
      "greska": "Nastavnik nije loginovan"
    });
  }

});

app.post('/logout', function(req, res) {

  delete req.session.username;
  delete req.session.predmeti;
  req.session.loggedIn = false;
  res.json({
    poruka: "Korisnik je izlogovan",
    url: "/prijava.html"
  });

});

app.get('/predmet/:naziv', async (req, res) => {
  let naziv = req.params.naziv;

  const predmet = await Predmet.findOne({
    where: {
      naziv: naziv
    }
  });

  if (Predmet) {
    const prisustva = await Prisustva.findAll({
      where: {
        predmetId: predmet.predmetId
      }
    });
    if (prisustva) {
      const studenti = await Student.findAll();
      res.json({
        prisustva: prisustva,
        predmet: predmet.naziv,
        brojPredavanjaSedmicno: predmet.brojPredavanjaSedmicno,
        brojVjezbiSedmicno: predmet.brojVjezbiSedmicno,
        studenti: studenti
      });
    }
  }

});

app.post('/prisustvo/predmet/:naziv/student/:index', async(req, res) => {
  let naziv = req.params.naziv;
  let index = req.params.index;

  let sedmica = parseInt(req.body.sedmica);
  let predavanja = parseInt(req.body.predavanja);
  let vjezbe = parseInt(req.body.vjezbe);

  //console.log(predavanja, vjezbe);

  const predmet = await Predmet.findOne({
    where: {
      naziv: naziv
    }
  });

  if (predmet) {
    const studenti = await Student.findAll();

    if (studenti) {

      const prisustva = await Prisustva.findOne({
        where: {
          predmetId: predmet.predmetId,
          sedmica: sedmica,
          studentIndex: index
        }
      });

      prisustva.predavanja = predavanja;
      prisustva.vjezbe = vjezbe;
      await prisustva.save();

      const prisustva_updated = await Prisustva.findAll({
        where : {
          predmetId: predmet.predmetId
        }
      });

      if (prisustva_updated) {
        res.json({
          prisustva: prisustva_updated,
          predmet: predmet.naziv,
          brojPredavanjaSedmicno: predmet.brojPredavanjaSedmicno,
          brojVjezbiSedmicno: predmet.brojVjezbiSedmicno,
          studenti: studenti
        });
      }

    }
  }
});

app.listen(port, function() {
  console.log("Listening on " + port);
});

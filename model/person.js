const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')
//const sequelize = new Sequelize('mysql://lordisrael:loveiman@localhost/person')


const User = sequelize.define('User', {
    // Model attributes are defined here
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    id: {
      type: DataTypes.UUID, // Assuming UUIDs are stored as strings
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4, // Default value for new records
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your email'
          }
        }
    },
    age: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    },
    gender: {
        type: DataTypes.STRING
    },
    // uuid: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4 
    // }

});
  
sequelize.sync();
module.exports = User
  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User); 
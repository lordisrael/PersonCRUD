const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')
//const sequelize = new Sequelize('mysql://lordisrael:loveiman@localhost/person')


const User = sequelize.define('User', {
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
          msg: 'Name cannot be NULL'
        },
        notEmpty: {
          msg: 'Name cannot be empty'
        },
      }
    },
    email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid email format.'
          },
          notNull: {
            msg: 'Email cannot be NULL'
          },
          notEmpty:{
            msg: 'Email cannot be empty'
          },
        }
    },
    age: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    },
    country:{
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.ENUM('Female', 'Male', 'Prefer not to say'),
      allowNull: false,
      defaultValue: 'Prefer not to say'
    },
}, {
  timestamps: false
});
  
sequelize.sync();
module.exports = User
  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User); 
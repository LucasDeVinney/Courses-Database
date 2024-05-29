'use strict';
const {
  Model
} = require('sequelize');

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model { }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'First Name Required'
        }
      }
    },
    lastName:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required'
        },
        notEmpty: {
          msg: 'Last Name Required'
        }
      }
    },
    emailAddress:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email you entered already exists'
      },
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        isEmail: {
          msg: 'Valid Email Required'
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'Password Required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // Hashing for password
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword; 
  });

  // Creates hasMany association with Course
  User.associate = (models) => {
    User.hasMany(models.Course, { 
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }, 
    })
  }

  return User;
};
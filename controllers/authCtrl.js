const User = require('../model/person')
const uuidValidate = require('uuid-validate');
const {StatusCodes} = require('http-status-codes')
const sequelize = require('../config/db')

const createPerson = async(req, res) => {
    const {email} = req.body
    const userAlreadyExists = await User.findOne({ where: { email } })
    if(!userAlreadyExists) {
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json(user)
    } else {
        return res.status(StatusCodes.CONFLICT).json('Email already exists')
        //throw new ConflictError('Email already Exists')
    }
}

const getPerson = async (req, res) => {
    // const { param } = req.params;
    // const user = await User.findByPk(param);
    //   if (!user) {
    //     return res.status(StatusCodes.NOT_FOUND).json(`User with id: ${param} not found`);
    //   }
    //   res.status(200).json({ user });
const { param } = req.params;
  if (uuidValidate(param, 4)) {
    try {
      const user = await User.findByPk(param);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(`User with id: ${param} not found`);;
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    try {
      const user = await User.findOne({
        where: {
         name: param 
        },
      });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(`User with name or email: ${param} not found`);
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
 };


module.exports = {
    createPerson,
    getPerson,
}
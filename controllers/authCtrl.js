const User = require('../model/person')
const uuidValidate = require('uuid-validate');
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError, ConflictError} = require('../error')
const { Op } = require('sequelize')
const sequelize = require('../config/db')

const createPerson = async(req, res) => {
    const {email} = req.body
    const userAlreadyExists = await User.findOne({ where: { email } })
    if(!userAlreadyExists) {
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json(user)
    } else {
        return res.status(StatusCodes.CONFLICT).json('Email already exists')
    }
}

const getPerson = async (req, res) => {
const { param } = req.params;
  if (uuidValidate(param, 4)) {
    try {
      const user = await User.findByPk(param);
      if (!user) {
        throw new NotFoundError(`User with id: ${param} not found`);
        //return res.status(StatusCodes.NOT_FOUND).json(`User with id: ${param} not found`);;
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    try {
      const user = await User.findOne({
        where: { 
          [Op.or]: [{ name: param }, { email: param }]
        },
      });
      if (!user) {
        throw new NotFoundError(`User with name or email: ${param} not found`);
        //return res.status(StatusCodes.NOT_FOUND).json(`User with name or email: ${param} not found`);
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
 };

const updatePerson = async(req, res) => {
  const { param } = req.params;
    if (uuidValidate(param, 4)) {
      user = await User.findByPk(param)
        if (user) {
          await user.update({
          age: req.body.age,
          country: req.body.country,
        });
        if (!user) {
          throw new NotFoundError(`User with id: ${param} not found`);
        }
      }  
    } else {
      user = await User.findOne({
        where: {
          [Op.or]: [{ name: param }, { email: param }] ,
        }
      })
      if(user) {
        await user.update({
        age: req.body.age,
        country: req.body.country,
      })
    }
    if (!user) {
      throw new NotFoundError(`User with name or email: ${param} not found`);
        //return res.status(StatusCodes.NOT_FOUND).json(`User with name or email: ${param} not found`)
  //return res.status(404).json({ message: 'Person not found' });
    }
  }
      res.status(200).json({ message: 'Person updated', user });
};

const deletePerson = async(req, res) => {
  const { param } = req.params;
    if (uuidValidate(param, 4)) {
      user = await User.findByPk(param)
        if (user) {
          await user.destroy();
        if (!user) {
            throw new NotFoundError(`User with id: ${param} not found`);
          }
      }  
    } else {
      user = await User.findOne({
        where: {
          [Op.or]: [{ name: param }, { email: param }] ,
        }
      })
      if(user) {
        await user.destroy()
    }
    if (!user) {
      throw new NotFoundError(`User with name or email: ${param} not found`);
       // return res.status(StatusCodes.NOT_FOUND).json(`User with name or email: ${param} not found`)
  
    }
  }
      res.status(200).json({ message: 'Person deleted', user });
};

module.exports = {
    createPerson,
    getPerson,
    updatePerson,
    deletePerson
}